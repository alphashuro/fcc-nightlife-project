// Configure environment variables.
require('dotenv').config({ silent: true });

require("babel-polyfill");
require("babel-register");
const app = require('./server/app').default;


// Use port 8080 by default.
const port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log('Listening on '+port);
});
