import { Request, Response } from "express";
import redis from '../../../../shared/redis/redis.js';
import User from "../models/user.model.js";
export const getPartner = async (req: Request, res: Response) => {
    try {
        const sessionId = req.cookies?.session;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const session = await redis.get(`session:${sessionId}`);

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "session expired"
            })
        }

        const sessionData = JSON.parse(session);
        const userId = sessionData.userId
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid session"
            });
        }

        //redis search
        const cachedPartner = await redis.get(`partner:${userId}`)

        if (cachedPartner) {
            const partner = JSON.parse(cachedPartner)

            return res.status(200).json({
                success: true,
                data: "Cached",
                partner
            })
        }

        //mongoDb search
        const partner = await User.findById(userId)

        if (!partner) {
            return res.status(401).json({
                success: false,
                message: "Partner not found"
            })
        }

        await redis.set(`partner:${userId}`, JSON.stringify(partner), "EX", 7 * 24 * 60 * 60)

        return res.status(200).json({
            success: true,
            data: "mongoDb",
            partner
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch partner profile"
        })
    }
}