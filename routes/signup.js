let router=require('express').Router()
let {SignUpController,insertData,SignInController,deleteOne,deleteController,updateController,display}=require("../controllers/SignupController")
const jwt=require("jsonwebtoken")

let SECRET_KEY="@01090"

let middleware=(req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token)
    if(token){
        token=token.split(" ")[1];
        let verify=jwt.verify(token,SECRET_KEY)
        console.log(verify)
    }else{
        console.log(`middleware error`)
    }
    next()
}
router.post('/signup',SignUpController)
router.post('/display',middleware,display)
router.post('/signin',SignInController)
router.delete('/delete',deleteController)
router.put('/update',updateController)
router.delete('/update',deleteOne)
router.post('/insertData',insertData)


module.exports= router