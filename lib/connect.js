"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function connect(config) {
    if (config.$env !== false) {
        require('dotenv').config(config.$env || {});
    }
    return function (origin) {
        Object.keys(config)
            .filter(key => key !== '$env')
            .forEach(key => {
            origin[key] = async function (event, _, callback) {
                const eventStr = event.toString();
                let queries = eventStr;
                try {
                    queries = JSON.parse(eventStr);
                }
                catch (e) { }
                const res = await config[key](queries, callback);
                if (res) {
                    callback(null, res);
                }
            };
        });
    };
}
exports.default = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixPQUFPLENBQUMsTUFBTTtJQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM3QztJQUNELE9BQU8sVUFBUyxNQUFNO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUM7YUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssV0FBVSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVE7Z0JBQzdDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixJQUFJO29CQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNoQztnQkFBQyxPQUFNLENBQUMsRUFBRSxHQUFFO2dCQUNiLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakQsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtBQUNILENBQUM7QUFyQkQsMEJBcUJDIn0=