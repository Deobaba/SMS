const express = require('express')
const app = express()

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());









PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`server is on ${PORT} `)
})