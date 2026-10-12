import { Request, Response } from "express";
import User from "../models/user.model";

export const getAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await User.findOne({
            role: "admin",
            isActive: true
        }).select("name email").lean()

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            })
        }

        return res.status(200).json({
            success: true,
            admin: {
                name: admin.name,
                email: admin.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get admin"
        })
    }
}