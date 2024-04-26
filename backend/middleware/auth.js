import jwt from "jsonwebtoken";

// in frontend we pass the token to the backend and this
// middleware convert token to the id 
const authMiddleware = async (req,res,next) => {

    // token pass in header in storecontext file
    const {token} = req.headers;
    if(!token)
    {
        return res.json({success:false,message:"Please Login First"})
    }
    
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"error"})
    }
}

export default authMiddleware;