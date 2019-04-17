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

export default function connect(config) {
  if (config.$env !== false) { 
    require('dotenv').config(config.$env || {});
  }
  if (config.$init) {
    config.$init(process.env);
  }
  return function(origin) {
    Object.keys(config)
    .filter(key => !key.startsWith('$'))
    .forEach(key => {
      origin[key] = async function(event, _, callback) {
        const eventStr = event.toString();
        let queries = eventStr;
        try {
          queries = JSON.parse(eventStr);
        } catch(e) {}
        const res = await config[key](queries, config, callback);
        if (res) {
          callback(null, res);
        }
      }
    })
  }
}