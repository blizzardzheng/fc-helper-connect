"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runscript = require('runscript');
async function runScriptBatch(commands, options) {
    const result = {};
    for (let command of commands) {
        command = command.name ? command : { name: command, exec: command };
        try {
            const stdout = await runscript(command.exec, Object.assign({}, options, (command.option || {})));
            result[command.name] = stdout;
        }
        catch (e) {
            result[command.name] = e;
        }
    }
    return result;
}
exports.runScriptBatch = runScriptBatch;
function connect(config, option) {
    const env = config.$env || option.env;
    const init = config.$init || option.init;
    if (env !== false) {
        require('dotenv').config(env || {});
    }
    if (init) {
        init(process.env);
    }
    return function (origin) {
        Object.keys(config)
            .filter(key => !key.startsWith('$'))
            .forEach(key => {
            origin[key] = async function (event, _, callback) {
                const eventStr = event.toString();
                let queries = eventStr;
                try {
                    queries = JSON.parse(eventStr);
                }
                catch (e) { }
                const res = await config[key](queries, config, callback);
                if (res) {
                    callback(null, res);
                }
            };
        });
    };
}
exports.default = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxRQUFRLEVBQUUsT0FBZ0I7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDcEUsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLG9CQUFPLE9BQU8sRUFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQjtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFaRCx3Q0FZQztBQUVELFNBQXdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTtJQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3pDLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtRQUNqQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyQztJQUNELElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sVUFBUyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxXQUFVLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUTtnQkFDN0MsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLElBQUk7b0JBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2hDO2dCQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUU7Z0JBQ2IsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekQsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUExQkQsMEJBMEJDIn0=