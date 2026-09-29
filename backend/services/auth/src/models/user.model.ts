import mongoose, { Document } from "mongoose";

interface ISocialLinks {
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
}

interface IPartnerProfile {
    slug?: string;
    bio?: string;
    website?: string;
    socialLinks?: ISocialLinks;

}

interface IPaymentdetails {
    method: "upi" | "bank";
    upiId?: string;
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
}

export interface IUser extends Document {
    firebaseUid: string,
    name: string,
    email: string,
    role: "partner" | "admin",
    partnerProfile: IPartnerProfile
    paymentDetails: IPaymentdetails,
    totalSales: number,
    totalRevenue: number,
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["partner", "admin"],
        default: "partner",
        index: true
    },
    partnerProfile: {
        slug: {
            type: String,
            unique: true,
            index: true
        },
        bio: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        socialLinks: {
            youtube: {
                type: String,
                default: "",
            },
            instagram: {
                type: String,
                default: "",
            },
            linkedin: {
                type: String,
                default: "",
            },
            github: {
                type: String,
                default: "",
            },
        }
    },
    paymentDetails: {
        method: {
            type: String,
            enum: ["upi", "bank"],
            default: "upi"
        },
        upiId: {
            type: String,
            default: "",
        },
        accountHolderName: {
            type: String,
            default: ""
        },
        accountNumber: {
            type: String,
            default: "",
        },
        ifscCode: {
            type: String,
            default: ""
        }
    },
    totalSales: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRevenue: {
        type: Number,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

const User=mongoose.model("User",userSchema);

export default User
