import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(cookieParser());


app.get("/health",(req,res)=>{
    res.json({status:true})
})

app.listen(PORT,()=>{
    console.log(`Auth service is running on port ${PORT}`)
})