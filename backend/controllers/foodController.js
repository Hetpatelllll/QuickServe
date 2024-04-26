import foodModel from "../models/foodModel.js";
import fs from "fs";


// Add food Item 
const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
         name:req.body.name, 
         description:req.body.description, 
         price:req.body.price, 
         category:req.body.category,
         image:image_filename,
    })

    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get All food 
const listFood = async (req,res) => {
    try {
        const food = await foodModel.find({});
        res.json({success:true,data:food})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

// remove food item
const removeFood = async (req,res)=>{
    try {
        // remove image in upload folder
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        // delete food in database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

export {addFood,listFood,removeFood}