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
function connect(config) {
    if (config.$env !== false) {
        require('dotenv').config(config.$env || {});
    }
    if (config.$init) {
        config.$init(process.env);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxRQUFRLEVBQUUsT0FBZ0I7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDcEUsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLG9CQUFPLE9BQU8sRUFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQjtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFaRCx3Q0FZQztBQUVELFNBQXdCLE9BQU8sQ0FBQyxNQUFNO0lBQ3BDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDekIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxVQUFTLE1BQU07UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLFdBQVUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRO2dCQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsSUFBSTtvQkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDaEM7Z0JBQUMsT0FBTSxDQUFDLEVBQUUsR0FBRTtnQkFDYixNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLEdBQUcsRUFBRTtvQkFDUCxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQXhCRCwwQkF3QkMifQ==