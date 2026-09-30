import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase";
import User from "../models/user.model";
import redis from "../../../../shared/redis/redis.js";

export const login = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token)

        let user = await User.findOne({ firebaseUid: decoded.uid });
        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email || "",
            })
        }
        const sessionId = crypto.randomUUID();

        await redis.set(`session:${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
        }), "EX", 7 * 24 * 60 * 60)

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        return res.status(201).json({ success: true, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Logging in error!!!", error: error });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.cookies;

        if (sessionId) {
            await redis.del(`session:${sessionId}`)
        }

        res.clearCookie("session", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })
        
        res.status(200).json({ success: true, message: "User logged out" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Logging out error", error: error })
    }
}