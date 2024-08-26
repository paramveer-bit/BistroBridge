import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"


////------------------------Adding New Items---------------------------------

export async function PATCH(req: NextRequest) {
    await dbConnect()
    try {
        const session = await auth()
        console.log(session);
        const email = session?.user.email;
        if (!session) {
            return NextResponse.json({ message: "No Logged in User found", success: false }, { status: 401 })

        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 401 })
        }

        const { orderId, status } = await req.json()
        console.log(orderId, status)
        const order = await OrderModel.findById(orderId)
        if (!order) {
            return NextResponse.json({ successs: false, message: "No orders Found " }, { status: 400 })
        }
        order.status = status
        await order.save({ validateBeforeSave: true })
        return NextResponse.json({ success: true, message: "Order status Success Fully changes" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching orders" }, { status: 500 })

    }


}