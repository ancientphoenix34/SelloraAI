import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db";
import authRouter from "./routes/auth.route";
import dns from 'node:dns';
import adminRouter from "./routes/admin.route";
import partnerRouter from "./routes/partner.route";

// Force Node to use Google DNS for SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(cookieParser());


app.get("/health",(req,res)=>{
    res.json({status:true})
})

app.use("/",authRouter);
app.use("/admin",adminRouter);
app.use('/partner',partnerRouter);

app.listen(PORT,()=>{
    console.log(`Auth service is running on port ${PORT}`)
    connectDB();
})