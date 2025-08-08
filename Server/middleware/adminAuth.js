const jwt=require("jsonwebtoken");
const adminAuth= async(req,res,next)=>{
    try {
    const {token}=req.headers;
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    const decode=jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
    if(decode!== process.env.ADMIN_EMAIL+process.env.ADMIN_PASS){
        return res.status(401).json({error:"Unauthorized"});
    }
    next();
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
module.exports=adminAuth;