const serve = require('koa-static');
const json = require('koa-json');
const koa = require('koa');
import * as routes from './router';

const app = koa();

app.use(json());
// Serve the front end to the client.
app.use(serve('./build'));
// Add api routes.
app.use(routes.exploreBars);

export default app;
