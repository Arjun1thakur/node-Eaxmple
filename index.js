const express=require('express')
require('dotenv').config()
let DB_connection=require('./connection/database')
const SignupRoute=require('./routes/signup')




const app=express()
app.use(express.json())
app.use('/',SignupRoute)
let PORT=process.env.PORT || 8080




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
    DB_connection()
})

