import { Request, Response } from "express";
import Product from "../models/product.model.js";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const partnerId = req.headers["x-user-id"] as string;

        if (partnerId) {
            return res.status(404).json({
                success: false,
                messsage: "Unauthorized"
            })
        }

        const {
            title,
            slug,
            description,
            type,
            price,
            links,
            status
        } = req.body;

        if (!slug || !slug.trim()) {
            return res.status(400).json({
                success: false,
                message: "Product slug is required"
            })
        }

        const clearSlug = slug.trim().toLowerCase();

        const existingProduct = await Product.findOne({
            slug: clearSlug
        })

        if (existingProduct) {
            return res.status(409).json({
                success: false,
                field: "slug",
                message: "This product slug is already taken. Please choose another slug."
            })
        }

        const product = await Product.create({
            partnerId,
            title: title.trim(),
            slug: clearSlug,
            description: description.trim(),
            type,
            price,
            links,
            status: status || "draft"
        })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error: any) {
        if (error?.code === 11000) {
            return res.status(409).json({
                success: false,
                field: "slug",
                message: "This product slug is already taken. Please choose another slug."
            })
        }
        return res.status(500).json({
            success:false,
            message:"Creation of product failed"
        })
    }
}