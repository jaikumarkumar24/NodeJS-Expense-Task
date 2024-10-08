import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config()
// Connect to the database
import connectDB from './db/connect.js';
connectDB();
import routes from './routes/index.js';

const app = express()
app.use(bodyparser.json());
app.use('/api', routes);

const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))