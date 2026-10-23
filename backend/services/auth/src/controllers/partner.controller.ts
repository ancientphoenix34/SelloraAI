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


export const updatePartner = async (req: Request, res: Response) => {
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

        //find user
        const partner = await User.findById(userId);

        if (!partner) {
            return res.status(401).json({
                success: false,
                message: "Partner not found"
            })
        }

        const { name, newPartnerProfile, newPaymentDetails } = req.body;
        if (name !== undefined) {
            partner.name = name.trim();
        }

        if (newPartnerProfile) {
            const currentProfile = partner.partnerProfile;
            const currentSlug = partner?.partnerProfile?.slug?.trim() || "";
            const newSlug = newPartnerProfile?.slug?.trim().toLowerCase();

            if (currentSlug) {
                //User already has a slug
                //Slug cannot be changed

                if (newSlug && newSlug !== currentSlug) {
                    return res.status(409).json({
                        success: false,
                        field: "slug",
                        message: "The profile slug cannot be changed once created."
                    })
                }
            } else {
                if (!newSlug) {
                    return res.status(400).json({
                        success: "false",
                        field: "slug",
                        message: "Profile slig is required."
                    })
                }

                //CHECK UNIQUENESS
                const existingPartner = await User.findOne({
                    "partnerProfile.slug": newSlug,
                    _id: {
                        $ne: partner._id
                    }
                })
                if (existingPartner) {
                    return res.status(409).json({
                        success: "false",
                        field: "slug",
                        message: "This profile slug is already taken."
                    })
                }
            }

            const currentSocialLinks = currentProfile.socialLinks

            //CREATE A COMPLETE PROFILE OBJECT
            partner.partnerProfile = {
                slug: currentSlug || newSlug || "",
                bio: newPartnerProfile.bio?.trim() ?? currentProfile.bio?.trim() ?? "",
                website: newPartnerProfile.website?.trim() ?? currentProfile.website?.trim() ?? "",
                socialLinks: {
                    youtube: newPartnerProfile.socialLinks?.youtube ?? currentSocialLinks?.youtube?.trim() ?? "",
                    instagram: newPartnerProfile.socialLinks?.instagram ?? currentSocialLinks?.instagram?.trim() ?? "",
                    linkedin: newPartnerProfile.socialLinks?.linkedin ?? currentSocialLinks?.linkedin?.trim() ?? "",
                    github: newPartnerProfile.socialLinks?.github ?? currentSocialLinks?.github?.trim() ?? ""
                }
            }
        }

        if (newPaymentDetails) {
            const currentPayment = partner.paymentDetails;

            partner.paymentDetails = {
                method: newPaymentDetails.method ?? currentPayment.method ?? "upi",
                upiId: newPaymentDetails.upiId ?? currentPayment.upiId ?? "",
                accountHolderName: newPaymentDetails.accountHolderName ?? currentPayment.accountHolderName ?? "",
                accountNumber: newPaymentDetails.accountNumber ?? currentPayment.accountNumber ?? "",
                ifscCode: newPaymentDetails.ifscCode ?? currentPayment.ifscCode ?? "",

            }
        }

        await partner.save();

        const updateSession = {
            userId: partner._id,
            name: partner.name,
            email: partner.email,
            role: partner.role
        }

        await redis.set(`session:${sessionId}`,
            JSON.stringify(updateSession),
            "EX", 7 * 24 * 60 * 60
        )

        const updatedPartner = partner.toObject();

        await redis.set(`partner:${partner._id}`,
            JSON.stringify(updatedPartner)
        )

        return res.status(200).json({
            success: true,
            message: "Partner profile updated successfully",
            partner: updatedPartner
        })

    } catch (error: any) {
        if (error?.code === 11000) {
            return res.status(409).json({
                success: "false",
                field: "slug",
                message: "This profile slug is already taken."
            })
        }

        return res.status(500).json({
            success:false,
            message:"Failed to update partner profile"
        })
    }
}