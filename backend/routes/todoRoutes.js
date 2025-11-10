const express=require('express');
const router=express.Router();
const {getTodos,createTodo,updateTodo,deleteTodo}=require('../controllers/todoController.js');
const auth=require('../middleware/authMiddleware.js');
router.get('/',auth,getTodos);
router.post('/',auth,createTodo);
router.put('/:id',auth,updateTodo);
router.delete('/:id',auth,deleteTodo);

module.exports=router;