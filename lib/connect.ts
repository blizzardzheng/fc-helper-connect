const runscript = require('runscript');
export async function runScriptBatch(commands, options?: object) {
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

export default function connect(config, option) {
  const env = config.$env || option.env;
  const init = config.$init || option.init;
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
    })
  }
}