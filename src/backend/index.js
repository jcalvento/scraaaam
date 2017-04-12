import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/scram');

import routes from './routes/routes.js'

const app = express();
app.use(bodyParser.json());

app.use(routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

//Static resources
app.use(express.static(__dirname + "/../../dist/frontend"));
