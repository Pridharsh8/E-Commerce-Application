const mongoose= require('mongoose')
const {isEmail} = require('validator')
const bcrypt= require('bcrypt');
const load=require('loader')
const Schema=mongoose.Schema

const custSchema= new Schema(
    {
        userName:{
            type:String,
            required:[true, 'Please enter an username'],
            unique:true
        },
        mail:{
            type:String,
            required:[true, 'Please enter an email'],
            validate:[isEmail ,'Please enter a valid email']
        },
        password:{
            type:String,
            required:true,
            minlength:6
        }
    }
)

// custSchema.post('save', function(doc,next){
//     console.log('New user was created',doc)
//     next();

// })
custSchema.pre('save', async function(next){
   const salt= await bcrypt.genSalt();
   this.password=await bcrypt.hash(this.password,salt);
    next();
})

custSchema.statics.login = async function(mail,password){
    const user=await this.findOne({mail});
    if(user){
       const auth= await bcrypt.compare(password,user.password)
       if(auth){
        return user;
       }
       throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports= mongoose.model("Cust",custSchema)