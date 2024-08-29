import ItemModel from '@/models/item.model'
import mongoose from 'mongoose'
import { auth } from "@/auth"
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'


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

        const { code, name, image, price, stock, description, category } = await req.json()

        const item = await ItemModel.findOne({ code })

        if (item) {
            return NextResponse.json({ message: "Item with this code already exists", success: false }, { status: 400 })
        }

        const newItem = new ItemModel({
            code,
            name,
            image,
            stock,
            price,
            description,
            category,
            restro: user._id
        })

        await newItem.save();
        return NextResponse.json({ success: true, data: newItem, message: "Item created successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong which creating new item" }, { status: 500 })

    }


}