import jwt from "jsonwebtoken"
const authMiddleware=async (req,res,next) => {
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized login again"})
    }

    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);


        // --- ADD THIS CHECK ---
        // If req.body doesn't exist (e.g., in a GET request or a POST with no body),
        // initialize it as an empty object.
        if (!req.body) {
            req.body = {};
        }
        // -----------------------


        
        req.body.userId=token_decode.id;
        next();



        
    } catch (error) {
        console.log(error);
        res.json({success:false})

        
        
    }

    
}

export default authMiddleware;