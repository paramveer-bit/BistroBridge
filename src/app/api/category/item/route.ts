import ItemModel, { Item } from '@/models/item.model'
import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
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

        const { categoryId } = await req.json()

        const category = await CategoryModel.findById(categoryId)

        if (!category) { return NextResponse.json({ message: "Invalid category", success: false }, { status: 400 }) }

        console.log(categoryId)

        const items = await ItemModel.aggregate([
            {
                $match: {
                    category: new mongoose.Types.ObjectId(categoryId)
                }
            }
        ])

        if (!items) {
            return NextResponse.json({ success: false, message: "No items found", data: [] }, {
                status: 200
            })
        }

        return NextResponse.json({ success: true, message: "Item Found", data: items, name: category.name }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while finding items" }, { status: 500 })

    }


}