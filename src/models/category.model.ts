import mongoose, { Schema, Document, models, model } from "mongoose";
import { User } from '@/models/user.model'

export interface Category extends Document {
    name: string,
    image: string,
    restro: User
}

const categorySchema: Schema<Category> = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    restro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


})

const CategoryModel = (models.Category as mongoose.Model<Category>) || model<Category>('Category', categorySchema)
export default CategoryModel


