import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// register user
let registerUser = async (req,res)=>{
    let {name,email,password} = req.body;
    try {
        let existUser = await userModel.findOne({email});
        
        if(existUser)
        {
            return res.json({success:false,message:"User Already Exist"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Enter Valid email"})
        }

        if(password.length<8)
        {
            return res.json({success:false,message:"Enter Greater than 8 digit"})
        }

        // Incrypt password
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password,salt);

        let newUser = new userModel({name,email,password:hashPassword});
        newUser = await newUser.save();
        let token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY);
        
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,error})
    }
}

// login user
let loginUser = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email})

        if(!user)
        {
            return res.json({success:false,message:"User Does not Exist"})
        }
        
        const isPassword = await bcrypt.compare(password,user.password)
        
        if(!isPassword)
        {
            return res.json({success:false,message:"Invalid Password"})
        }

        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}


export {loginUser,registerUser}