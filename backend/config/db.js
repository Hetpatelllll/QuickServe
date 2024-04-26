import mongoose  from "mongoose";

export const connectDb = async () => {
    await mongoose.connect("mongodb+srv://hetfadadu123:hetfadadu123@cluster0.dmhrn0n.mongodb.net/food_del?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log("Db Connected");
    })
}