const runscript = require('runscript');


export async function runScriptBatch(commands:any, options?: object) {
  const result = {};
  for (let command of commands) {
    command = command.name ? command : { name: command, exec: command };
    try {
      const stdout = await runscript(command.exec, { ...options, ...(command.option || {})}); 
      result[command.name] = stdout;
    } catch(e) {
      result[command.name] = e;
    }
  }
  return result;
}


export function bind(func, config:any) {
  return async function(event, ctx, callback) {
    const eventStr = event.toString();
    let queries = eventStr;
    try {
      queries = JSON.parse(eventStr);
    } catch(e) {
      callback('Event String is not valid JSON');
    }
    try {
      const res = await func(queries, Object.assign({}, ctx, config), callback);
      if (res) {
        callback(null, res);
      }
    } catch(e) {
      callback(e);
    }
  }
}


export interface IConnectOption {
  $env?: string;
  $init?: string;
  [key:string]: any;
}
export default function connect(config: IConnectOption, option:any) {
  const env = config.$env || option.env;
  const init = config.$init || option.init;
  const initializer = config.$initializer || option.initializer;
  if (env !== false) { 
    require('dotenv').config(env || {});
  }
  if (init) {
    init(process.env);
  }
  return function(origin) {
    Object.keys(config)
    .filter(key => !key.startsWith('$'))
    .forEach(key => {
      origin[key] = async function(event, ctx, callback) {
        const eventStr = event.toString();
        let queries = eventStr;
        try {
          queries = JSON.parse(eventStr);
        } catch(e) {
          callback('Event String is not valid JSON');
        }
        try {
          const res = await config[key](queries, Object.assign({}, ctx, config), callback);
          if (res) {
            callback(null, res);
          }
        } catch(e) {
          callback(e);
        }
      }
    });
    if (initializer) {
      origin.initializer = function(context, callback) {
          callback(null, initializer(context, process.env));
      }
    }
  }
}