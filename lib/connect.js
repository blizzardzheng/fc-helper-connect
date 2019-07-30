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
            origin[key] = async function (event, ctx, callback) {
                const eventStr = event.toString();
                let queries = eventStr;
                try {
                    queries = JSON.parse(eventStr);
                }
                catch (e) {
                    callback('Event String is not valid JSON');
                }
                try {
                    const res = await config[key](queries, Object.assign({}, ctx, config), callback);
                    if (res) {
                        callback(null, res);
                    }
                }
                catch (e) {
                    callback(e);
                }
            };
        });
    };
}
exports.default = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxRQUFRLEVBQUUsT0FBZ0I7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDcEUsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLG9CQUFPLE9BQU8sRUFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQjtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFaRCx3Q0FZQztBQUVELFNBQXdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTtJQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3pDLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtRQUNqQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyQztJQUNELElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sVUFBUyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxXQUFVLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDL0MsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLElBQUk7b0JBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2hDO2dCQUFDLE9BQU0sQ0FBQyxFQUFFO29CQUNULFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFJO29CQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2pGLElBQUksR0FBRyxFQUFFO3dCQUNQLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQ3JCO2lCQUNGO2dCQUFDLE9BQU0sQ0FBQyxFQUFFO29CQUNULFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWhDRCwwQkFnQ0MifQ==