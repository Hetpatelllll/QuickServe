import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cartData:{
        type:Object,
        default:{}
    },
    
// without this cartData is not created because it have empty object 
},{minimize:false})

export default mongoose.model("user",userSchema)