const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
// Generate tokens
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
}
// Post /api/users/register
exports.registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        // Missing fields
        if(!name || !email || !password) return res.status(400).json({message:'Fill all fields'});
        // Check if user exists
        const userExists=await User.findOne({email});
        if(userExists) return res.status(400).json({message:'User already exists'});
        // New user
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({message:'Server error',error:error.message});
    }
}

// Post /api/users/login

exports.loginUser=async(req,res)=>{
    try {
        // Get the details
        const {email,password}=req.body;
        // Find the corresponding user
        const user=await User.findOne({email});
        // If user doesnt exist 
        if(!user) return res.status(400).json({message:'Invalid credentials',error:error.message});
        // If user exists , compare the password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials',error:error.message});
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({message:'Server error',error:error.message});
    }
}

// Get /api/users/me

exports.getMe=async(req,res)=>{
    // Get only name and email fields
    const user=await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
}