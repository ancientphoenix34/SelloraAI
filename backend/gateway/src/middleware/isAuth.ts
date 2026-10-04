import { Request, Response, NextFunction } from "express";
import redis from "../../../shared/redis/redis.js"
interface IUserSession {
    userId: string,
    name: string,
    email: string,
    role: string
}

declare global {
    namespace Express {
        interface Request {
            user: IUserSession
        }
    }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
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
                message: "Session Expired"
            })
        }
        req.user = JSON.parse(session) as IUserSession;
        next();

    } catch (error) {
        console.error("isAuth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "IsAuth Error",
            error: error instanceof Error ? error.message : String(error)
        })
    }
}

export default isAuth;