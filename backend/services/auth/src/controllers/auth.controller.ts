import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase";
import User from "../models/user.model";

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

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error",error:error})
    }
}