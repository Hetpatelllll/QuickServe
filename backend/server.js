import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json())
app.use(cors())

// DB Connection
connectDb();

// api endpoints
app.use("/api/food",foodRouter)                                                    
app.use("/api/user",userRouter)                                                    
app.use("/api/cart",cartRouter)                                                    
app.use("/api/order",orderRouter)                                                    

// for access image database to frontend
app.use("/images",express.static('uploads'))

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})