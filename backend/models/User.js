const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Add a name'],
    },
    email:{
        type:String,
        required:[true,'Add a email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Add a password'],
    },
},{
    timestamps:true,
});

module.exports=new mongoose.model('User',userSchema);