import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config()
// Connect to the database
import connectDB from './db/connect.js';
connectDB();
import routes from './routes/index.js';

import { handleError } from './middleware/errorHandler.js';

const app = express()
app.use(bodyparser.json());
app.use('/api', routes);

const port = process.env.PORT

app.use((err, req, res, next) => {
    handleError(err, req, res, next);
  });
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))