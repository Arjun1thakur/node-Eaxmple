// DB-connection
const mongoose=require('mongoose')

let connection=async ()=>{
    try{
        mongoose.connect(process.env.URL)
        console.log(`done bro`)
    }catch(error){
        console.log(`Error from database.js --> ${error}`)
    }
}

module.exports=connection