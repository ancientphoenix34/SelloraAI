import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import proxy from "express-http-proxy";
dotenv.config();

const PORT=process.env.PORT;
const AUTH_SERVICE_URL=process.env.AUTH_SERVICE_URL as string;

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health",(req,res)=>{
    res.json({status:true})
})

app.use("/api/auth",proxy(AUTH_SERVICE_URL))

app.listen(PORT,()=>{
    console.log(`Gateway is running on port ${PORT}`)
})