export default function connect(config) {
  if (config.$env !== false) { 
    require('dotenv').config(config.$env || {});
  }
  return function(origin) {
    Object.keys(config)
    .filter(key => key !== '$env')
    .forEach(key => {
      origin[key] = async function(event, _, callback) {
        const eventStr = event.toString();
        let queries = eventStr;
        try {
          queries = JSON.parse(eventStr);
        } catch(e) {}
        const res = await config[key](queries, callback);
        if (res) {
          callback(null, res);
        }
      }
    })
  }
}