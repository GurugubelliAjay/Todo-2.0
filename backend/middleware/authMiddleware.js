const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    // Get the authorization header 'Bearer <token>'
    const authHeader=req.headers.authorization;
    // Check if token exists and starts with bearer
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'No token, authorization denied'});
    }
    // Extract token
    const token=authHeader.split(' ')[1];
    try {
        // Verify the token using the secret
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // Attach user id from token payload to the req obj
        req.user=decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'});
    }
}

module.exports=auth;