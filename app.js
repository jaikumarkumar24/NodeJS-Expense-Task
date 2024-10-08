import express from 'express'


import dotenv from 'dotenv';
dotenv.config()



import connectDB from './db/connect.js';
// Connect to the database
connectDB();

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))