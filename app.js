const app = require('./api/api');
const config = require('./config');

app.listen(config.server_port);

console.log("Here is output");
