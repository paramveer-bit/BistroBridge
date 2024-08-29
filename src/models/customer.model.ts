import mongoose, { Schema, Document, models, model } from "mongoose";
import { User } from '@/models/user.model'

export interface Customer extends Document {
    phoneNo: number,
    rewards: number,
    restro: User
}

const customerSchema: Schema<Customer> = new Schema({
    phoneNo: {
        type: Number,
        required: true,
    },
    rewards: {
        type: Number,
        default: 0
    },
    restro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },



})

const CustomerModel = (models.Customer as mongoose.Model<Customer>) || model<Customer>('Customer', customerSchema)
export default CustomerModel


