import mongoose, { Document } from "mongoose"

interface IProductLink {
    title: string;
    url: string;
}

export interface IProduct extends Document {
    partnerId: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    description: string;
    type:
    | "course"
    | "course-code"
    | "ebook"
    | "ui-kit"
    | "template"
    | "ai-prompt"
    | "software"
    | "other";
    price: number;
    links: IProductLink[];
    status:
    | "draft"
    | "published";
    totalSales: number;
    totalRevenue: number;
    createdAt: Date;
    updatedat: Date;
}


const ProductSchema = new mongoose.Schema<IProduct>({
    partnerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: [
            "course",
            "course-code",
            "ebook",
            "ui-kit",
            "template",
            "ai-prompt",
            "software",
            "other"
        ],
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    links: [
        {
            title: {
                type: String,
                required: true,
                trim: true
            },
            url: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    status: {
        type: String,
        enum: [
            "draft",
            "published"
        ],
        default: "draft",
        index: true
    },
    totalSales: {
        type: Number,
        default: 0
    },
    totalRevenue: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Product=mongoose.model("Product",ProductSchema);

export default Product;