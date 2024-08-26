import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest) {
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

        const orders = await OrderModel.aggregate([
            {
                $match: {
                    restro: user._id
                }
            },
            {
                $sort: {
                    'order.createdAt': -1,
                }

            }
        ])
        if (!orders) {
            return NextResponse.json({ successs: false, message: "No orders are there" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching orders" }, { status: 500 })

    }


}