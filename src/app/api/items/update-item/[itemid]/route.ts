import ItemModel, { Item } from '@/models/item.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest, { params }: { params: { itemid: string } }) {
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

        const itemid = params.itemid;
        const { code, name, image, price, stock, description, category } = await req.json()
        console.log(code, name, image, price, stock, description, category)

        const item = await ItemModel.findById(itemid)

        if (!item) { return NextResponse.json({ message: "No item found", success: false }, { status: 400 }) }

        if (item) {
            item.name = name ?? item.name;
            item.image = image ?? item.image;
            item.price = price ?? item.price;
            item.stock = stock ?? item.stock;
            item.description = description ?? item.description;
            item.category = category ?? item.category;
            await item.save({ validateBeforeSave: true });
        }


        return NextResponse.json({ success: true, message: "Item Updated Successfully", data: item }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while deleting item" }, { status: 500 })

    }


}