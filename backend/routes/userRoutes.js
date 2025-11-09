const express=require('express');
const router=express.Router();
const {registerUser,loginUser,getMe}=require('../controllers/userController.js');
const auth=require('../middleware/authMiddleware.js');

// /api/users/

// Register
router.post('/register',registerUser);
// Login
router.post('/login',loginUser);
// Get Profile
router.get('/me',auth,getMe);

module.exports=router;