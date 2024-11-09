const user=require('../models/Customers');
const { use } = require('../route/userroute');
const handleErrors=(err)=>{
    console.log(err.message, err.code)
    let er ={email:'', password:''}

    if(err.message.includes('Cust validation failed')){
        console.log(err)
    }


}
const signup_get=(req,res)=>{
    res.render('signup');
}
const signup_post=async (req,res)=>{
    const {userName,mail,password}=req.body
    
    console.log(req.body)

    try{
        const users= await user.create({userName,mail,password});
        res.status(200).json(users)

    }
    catch(e){
        const error=handleErrors(e);
        res.status(400).send('error was created')
    }
    // res.send('signup');
}
const login_get=(req,res)=>{
    res.send('signup');
}
const login_post= async (req,res)=>{
    const {mail,password}=req.body;
    try{
        const User= await user.login(mail,password);
        res.status(200).json({user:user._id})
        console.log('Login success, User ID:', User._id);
        console.log('success')
    }
    catch(err){
        res.status(400).json({});
        console.log('fails')
    }
}


module.exports= {signup_get,signup_post,login_get,login_post}