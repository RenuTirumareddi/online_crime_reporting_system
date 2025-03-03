const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.auth = async (req,res,next)=>{
    try{
        const token = req.cookies["Crime_Report"] || req.header.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Authorization Denied, no token provided",
            });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        let user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized, no user found"
        })
    }
    if(req.user.role == 'admin'){
        next();
    }else{
        return res.status(403).json({
            success: false,
            message: "Forbidden, You are not authorized to access this resource",
        })
    }
}