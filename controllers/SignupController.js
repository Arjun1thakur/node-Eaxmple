let bcrypt=require('bcrypt')
let Users=require('../models/signupSchema')
const jwt=require('jsonwebtoken')
let SECRET_KEY="@01090"


let arr=[]
let insert=()=>{
    fetch('https://dummyjson.com/users')
    .then(res=>res.json())
    .then(res=>arr.push(res))
}
insert()

let middleware=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        token=token.split(" ")[1]
        let verify=jwt.verify(token,SECRET_KEY)
        req.userID=user.id
        console.log(verify)
    }else{
        console.log(`middleware error`)
    }
    next()
}

let SignUpController=async(req,res)=>{
    try{
        let {name,pass}=req.body
        let password=await bcrypt.hash(pass,10)
        let user={name,password}
        let token=jwt.sign(user,SECRET_KEY)
        await Users.insertMany(user)
        return res.status(200).send({name,password,token})
    }catch(error){
        console.log(`Error from SignupController.js --> ${error}`)
        return res.status(200).send({message:error})
    }
}

let display=async(req,res)=>{
    try{
        console.log(req.UserID)
        return res.status(200).json(await Users.find({}))
    }catch(error){
        console.log(`Error from SignInController.js --> ${error}`)
        return res.status(200).send({message:error})
    }
}

let SignInController=async(req,res)=>{
    try{
        let {name,pass}=req.body
        let Data=await Users.findOne({name:name})
        let passCheck=await bcrypt.compare(pass,Data.password)
        console.log(`mast boss`)
        return res.status(200).json({message:passCheck})
    }catch(error){
        console.log(`Error from SignInController.js --> ${error}`)
        return res.status(200).send({message:'error'})
    }
}

let updateController=async(req,res)=>{
    try{
        let {name,pass}=req.body
        let password=await bcrypt.hash(pass,10)
        let Data=await Users.updateOne({name:name},{password:password})
        console.log(await Users.find({}))
        return res.status(200).json({message:Data})
    }catch(error){
        console.log(`Error from SignInController.js --> ${error}`)
        return res.status(200).send({message:'error'})
    }
}

let deleteController=async(req,res)=>{
    try{
        await Users.deleteMany()
        return res.status(200).json(await Users.find({}))
    }catch(error){
        console.log(`Error from SignInController.js --> ${error}`)
        return res.status(200).send({message:error})
    }
}

let deleteOne=async(req,res)=>{
    try{
        let {name,pass}=req.body
        await Users.deleteOne({name:name})
        return res.status(200).json(await Users.find({}))
    }catch(error){
        console.log(`Error from SignInController.js --> ${error}`)
        return res.status(200).send({message:error})
    }
}
let insertData=async(req,res)=>{
    try {
        await Users.insertMany(arr)
        console.log(`done`)
    } catch (error) {
        console.log(`Error from inserData.js --> ${error}`)
        return res.status(400).send({message:error})
    }
}
module.exports={SignUpController,SignInController,insertData,display,deleteOne,deleteController,updateController}