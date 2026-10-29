import express from "express"
import { createProduct } from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.post("/create", createProduct);

export default productRouter;