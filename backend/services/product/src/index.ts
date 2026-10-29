import express from "express";
import dotenv from "dotenv";
import dns from 'node:dns';
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";


// Force Node to use Google DNS for SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());



app.get("/health", (req, res) => {
    res.json({ status: true, message: "Product service is responding" })
})

app.use("/", productRouter)

app.listen(PORT, () => {
    console.log(`Product service is running on port ${PORT}`);
    connectDB();
})