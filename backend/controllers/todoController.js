const Todo=require('../models/Todo.js');
// Get /api/todos
const getTodos=async(req,res)=>{
    try {
        const todos=await Todo.find({user:req.user}).sort({createdAt:-1});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message:'Server Error',error:error.message});
    }
}
// Post /api/todos
const createTodo=async(req,res)=>{
    try {
        const todo=new Todo({text:req.body.text,user:req.user});
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({message:'Bad request',error:error.message});
    }
}
// Put /api/todos/:id
const updateTodo=async(req,res)=>{
    try {
        const todo=await Todo.findByIdAndUpdate({_id:req.params.id,user:req.user},req.body,{new:true});
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({message:'Bad request',error:error.message});
    }
}
// Delete /api/todos/:id
const deleteTodo=async(req,res)=>{
    try {
        const todo=await Todo.findByIdAndDelete({_id:req.params.id,user:req.user});
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({message:'Todo deleted'});
    } catch (error) {
        res.status(400).json({message:'Bad request',error:error.message});
    }
}

module.exports={getTodos,createTodo,updateTodo,deleteTodo};