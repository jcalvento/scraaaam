import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes/routes.js'

const app = express();
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname + "/../../dist/frontend"));

process.title = 'scraaaam';

export default app;