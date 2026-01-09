import express from "express";
import cors from "cors"
import "dotenv/config"

//app configuration
const app=express();
const port=process.env.PORT|| 4000;

//middleware
app.use(express.json())
app.use(cors())

//mongodb+srv://umarproject1:12345@cluster0.lpbjuby.mongodb.net/?appName=Cluster0 

//database
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
connectDB();


//api endpoint
app.use("/api/food",foodRouter)

app.use("/images",express.static('uploads'))

app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


//run server
app.listen(port,()=>{
    console.log(`Server is on http://localhost:${port}`);
    
})


//make api's


app.get("/",(req,res)=>{
    res.send("API working")

})





