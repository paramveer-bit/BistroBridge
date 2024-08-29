import ItemModel from '@/models/item.model'
import OrderModel, { OrderItem } from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'

////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const { name, phoneNo, tableNo, items, orderValue } = await req.json()

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

        const order = await OrderModel.create({
            name,
            phoneNo,
            tableNo,
            items,
            orderValue
        })

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not created" }, { status: 500 })
        }

        return NextResponse.json({ success: true, data: order, message: "Order Created Successfully" }, { status: 200 })

    } catch (error: any) {
        console.error(error) // Log error for debugging
        return NextResponse.json({ success: false, error: error.message, message: "Something went wrong while creating the order" }, { status: 500 })
    }
}
