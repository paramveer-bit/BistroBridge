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

        const { name, image } = await req.json()

        const category = await CategoryModel.findOne({ name: name, restro: user._id })

        if (category) { return NextResponse.json({ message: "Category name should be unique", success: false }, { status: 400 }) }

        const newCategory = await CategoryModel.create({ name, image, restro: user._id })



        return NextResponse.json({ success: true, message: "New Category created", data: newCategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while creating Category" }, { status: 500 })

    }


}