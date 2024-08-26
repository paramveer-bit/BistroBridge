import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"


////------------------------Adding New Items---------------------------------

export async function DELETE(req: NextRequest, { params }: { params: { categoryid: string } }) {
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

        const categoryid = params.categoryid;

        const category = await CategoryModel.findById(categoryid)

        if (!category) { return NextResponse.json({ message: "No Category found", success: false }, { status: 400 }) }

        if (user._id != category.restro) {
            return NextResponse.json({ message: "You can't delete this category", success: false }, { status: 401 })
        }

        await CategoryModel.findByIdAndDelete(categoryid)

        return NextResponse.json({ success: true, message: "Category delete Successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while deleting Category" }, { status: 500 })

    }


}