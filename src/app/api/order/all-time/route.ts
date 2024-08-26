import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose, { Mongoose } from 'mongoose'
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


        const revenue = await OrderModel.aggregate([
            {
                $match: {
                    restro: user._id
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    orderValue: "$orderValue",
                }
            },

            {
                $group: {
                    _id: "$date", // Group by the formatted date string
                    totalRevenue: { $sum: "$orderValue" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    date: "$_id"
                }
            },
            {
                $project: {
                    _id: 0 // Exclude the _id field
                }
            },
            {
                $sort: {
                    date: 1 // Sort by createdAt in ascending order
                }
            },
        ])
        if (!revenue) {
            return NextResponse.json({ successs: false, message: "Error in finding revenue" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: revenue }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching revenue" }, { status: 500 })

    }


}