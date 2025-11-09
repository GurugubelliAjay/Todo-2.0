const mongoose=require('mongoose');
const todoSchema=mongoose.Schema({
    text:{
        type:String,
        required:[true,'Enter todo text'],
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
module.exports=mongoose.model('Todo',todoSchema);