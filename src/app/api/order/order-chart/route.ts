import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import { subMonths, eachDayOfInterval, format } from 'date-fns';
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

        const sixMonthsAgo = subMonths(new Date(), 6);
        const today = new Date();

        // Generate an array of dates from six months ago to today
        const allDates = eachDayOfInterval({ start: sixMonthsAgo, end: today }).map(date =>
            format(date, 'yyyy-MM-dd')
        );

        const revenue = await OrderModel.aggregate([
            {
                $match: {
                    restro: user._id,
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    status: "$status",
                }
            },
            {
                $group: {
                    _id: "$date", // Group by the formatted date string
                    completedCount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Completed"] }, 1, 0]
                        }
                    },
                    canceledCount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field from the final output
                    date: "$_id",
                    completedCount: 1,
                    canceledCount: 1
                }
            },
            {
                $sort: {
                    date: 1 // Sort by createdAt in ascending order
                }
            },
        ])
        if (!revenue) {
            return NextResponse.json({ successs: false, message: "Error in finding number of orders" }, { status: 400 })
        }
        console.log(revenue)

        const revenueMap = new Map(revenue.map(item => [item.date, item]));
        console.log(revenueMap)

        // Fill in missing dates with completedCount = 0 and canceledCount = 0
        const filledRevenue = allDates.map(date => {
            if (revenueMap.has(date)) {
                return revenueMap.get(date);
            } else {
                return { date, completedCount: 0, canceledCount: 0 };
            }
        });

        return NextResponse.json({ success: true, data: filledRevenue }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching no. of orders" }, { status: 500 })

    }


}