import mongoose, { Schema, Document, models, model } from "mongoose";
import { Item } from "./item.model";
import { User } from '@/models/user.model';
import { Customer } from '@/models/customer.model'

export interface OrderItem extends Document {
    orderItem: Item,
    quantity: number
}

const orderItem: Schema<OrderItem> = new Schema({
    orderItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    quantity: {
        type: Number,
        require: true
    }
});

export interface Order extends Document {
    customer: Customer,
    tableNo: number,
    orderNo: number,
    status: string,
    items: OrderItem[],
    createdAt: Date,
    orderValue: number,
    restro: User
}

const orderSchema: Schema<Order> = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    tableNo: {
        type: Number,
    },
    orderNo: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Pending", "Cancelled", "Completed"],
        default: "Pending",
    },
    items: {
        type: [orderItem],
    },
    orderValue: {
        type: Number,
        default: 0
    },
    restro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

// Add the auto-increment pre-save hook
orderSchema.pre<Order>('save', async function (next) {
    if (this.isNew) {
        const lastOrder = await OrderModel.findOne().sort({ orderNo: -1 }).exec();
        this.orderNo = (lastOrder?.orderNo || 0) + 1;
    }
    next();
});

const OrderModel = (models.Order as mongoose.Model<Order>) || model<Order>('Order', orderSchema);
export default OrderModel;
