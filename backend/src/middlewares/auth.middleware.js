import { verifyToken } from "../util/generateToken.js";

export const authMiddleware = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

