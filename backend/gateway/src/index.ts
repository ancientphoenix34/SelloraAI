import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.get("/health",(req,res)=>{
    res.json({status:true})
})

app.listen(PORT,()=>{
    console.log(`Gateway is running on port ${PORT}`)
})