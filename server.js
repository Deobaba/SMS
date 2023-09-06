const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const {erorHandler} = require('./utils');
const errorHandler = require('./middleware/error');
const app = express()
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const auth = require('./route/auth')

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());



app.use('/',auth)



app.use(errorHandler)

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is on ${PORT} `)
})