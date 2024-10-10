import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { handleError } from './middleware/errorHandler.js';
dotenv.config()
connectDB();

const app = express()
app.use(bodyparser.json());
app.use('/api', routes);

const PORT = process.env.PORT

app.use((err, req, res, next) => {
    handleError(err, req, res, next);
  });
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))