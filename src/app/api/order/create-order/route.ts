import ItemModel from '@/models/item.model'
import OrderModel, { OrderItem } from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import CustomerModel from '@/models/customer.model'
import UserModel from '@/models/user.model'
import { auth } from "@/auth"

////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        // console.log(req.json())
        const { phoneNo, tableNo, items = [], orderValue } = await req.json()
        console.log(phoneNo, tableNo, items, orderValue)
        // Getting Restro Details
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

        // Validate phone number
        let customer = await CustomerModel.findOne({ phoneNo: phoneNo, restro: user._id })
        if (!customer) {
            customer = await CustomerModel.create({ phoneNo, restro: user._id })
        }
        console.log(customer)
        console.log(items)

        if (items.length === 0) {
            return NextResponse.json({ success: false, message: "Items are needed to create an order" }, { status: 400 })
        }

        // Update item stock
        await Promise.all(items.map(async (orderItem: OrderItem) => {
            const item = await ItemModel.findById(orderItem._id)
            if (item) {
                if (item.stock < orderItem.quantity) {
                    throw new Error(`Insufficient stock for item with ID ${orderItem._id}`)
                }
                item.stock -= orderItem.quantity
                await item.save()
            }
        }))
        console.log("---------------------------------------------------------------")
        const order = await OrderModel.create({
            restro: user._id,
            customer: customer._id,
            tableNo,
            items,
            orderValue
        })

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not created" }, { status: 500 })
        }

        customer.rewards += orderValue / 100
        await customer.save()

        return NextResponse.json({ success: true, order: order, message: "Order Created Successfully" }, { status: 200 })

    } catch (error: any) {
        console.error(error) // Log error for debugging
        return NextResponse.json({ success: false, error: error.message, message: "Something went wrong while creating the order" }, { status: 500 })
    }
}
