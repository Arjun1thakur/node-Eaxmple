const mongoose=require('mongoose')

let users=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let Users=mongoose.model("users",users)
module.exports=Users