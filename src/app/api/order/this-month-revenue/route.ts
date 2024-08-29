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

        const currMonth = new Date().getMonth() + 1
        const revenue = await OrderModel.aggregate([
            {
                $match: {
                    restro: user._id,
                    status: "Completed"
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                    orderValue: "$orderValue",
                    phoneNo: "$phoneNo"
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" }, // Group by both month and year
                    revenue: { $sum: "$orderValue" }, // Sum up all orderValues for each group
                    count: { $sum: 1 }, // Count the number of orders in each group
                    uniqueNames: { $addToSet: "$phoneNo" }
                }
            },
            {
                $group: {
                    _id: null, // Group all documents into a single group
                    totalRevenue: { $sum: "$revenue" }, // Sum up all revenues
                    totalCount: { $sum: "$count" }, // Sum up all counts
                    totalCustomer: { $sum: { $size: "$uniqueNames" } } // Count the number of unique names
                }
            }
        ])
        console.log("-----------------------------------")
        console.log(revenue)
        if (!revenue) {
            return NextResponse.json({ successs: false, message: "Error in finding revenue" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: revenue[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching revenue" }, { status: 500 })

    }


}