'use client'

import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import CurrentOrder from './CurrentOrder'
import { useToast } from '@/components/ui/use-toast'

type OrderItems = {
    _id: string,
    code: string,
    name: string,
    image: string,
    stock: number,
    price: number,
    description: string,
    quantity : number
}
import { Item } from '@/models/item.model'
import axios from 'axios'


function NewOrderPage() {
    const [order,setOrder] = useState<OrderItems[]>([])
    const {toast} = useToast();
    const [placingOrder,setPlacingOrder] = useState(false) 
    const [totalOrderValue,setTotalOrderValue] = useState(0);

    const addOrderItem = (item: Item) => {
        // Check if the item is already in the order array
        const itemExists = order.some(existingItem => existingItem._id === item._id);
        
        if (!itemExists) {
            setOrder([{ ...item, quantity: 1 }, ...order]);
            setTotalOrderValue(totalOrderValue + item.price);
        }
        else{
            handleQuantity(item._id,1)
        }
    };

    const handleDelete = (_id:String)=>{
        setOrder(prevOrder => {
            const itemToRemove = prevOrder.find(item => item._id === _id);
            if (itemToRemove) {
                setTotalOrderValue(prevValue => prevValue - itemToRemove.price * itemToRemove.quantity);
            }
            return prevOrder.filter(item => item._id !== _id);
        });
    }

    const handleQuantity = (_id: String, change: number) => {
        setOrder(prevOrder => {
            // Find the index of the item to update
            const index = prevOrder.findIndex(item => item._id === _id);
            if (index === -1) return prevOrder; // If item not found, return the previous state
    
            // Calculate the new quantity
            const newQuantity = prevOrder[index].quantity + change;
    
            // Check if the new quantity exceeds available stock
            // Assuming you have a stock quantity in `orderItemDetails` which is an array or object

            if (prevOrder[index].stock < newQuantity) {
                console.log("----------------------------------")
                toast({
                    title : `Only ${prevOrder[index].quantity} ${prevOrder[index].name} are available`,
                    // description : "destructive"
                    className : "border-2 border-red-500 font-bold"
                })
                return prevOrder; // If stock is insufficient, return the previous state
            }
    
            // Create a new array with the updated quantity
            let newOrder;
            if (newQuantity <= 0) {
                // If quantity is zero or less, remove the item
                handleDelete(_id);
                newOrder = prevOrder.filter(item => item._id !== _id);
            } else {
                // Otherwise, update the item's quantity
                newOrder = prevOrder.map(item =>
                    item._id === _id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
                
            }
    
            // Return the new state
            return newOrder;
        });
    };

    const handlePlaceOrder = async (phoneNo:string,tableNo:string) =>{
        console.log(phoneNo,tableNo)
        try {
            setPlacingOrder(true)
            const orders = order.map((item)=>{
                return {
                    _id: item._id,
                    quantity: item.quantity
                }
            })
            console.log(orders)

            const res = await axios.post('/api/order/create-order',{phoneNo,tableNo,items:orders,orderValue:totalOrderValue})
            console.log(res)
            setTotalOrderValue(0)
            setOrder([])
            return true;
        } catch (error) {
            console.log(error)
            toast({
                title : "Order not placed",
                description : "destructive"
            })
            return false;
        } finally{
            setPlacingOrder(false)
        }
    }


    useEffect(()=>{
        let value = 0;
        order.map((item)=>{
            value = value + item.price * item.quantity
        })
        setTotalOrderValue(value)
        
    },[order])

  return (
    <div className='w-full mx-3 p-3 ml-52'>
        <div >
            <h1 className=" my-5 m-3 text-4xl font-semibold">New Order</h1>
        </div>
        <div className='flex w-full space-x-4'>
            <div className='w-[70%] bg-white p-2 rounded-lg'>
                <Menu addOrderItem={addOrderItem}/>
            </div>
            <div className='w-[30%]'>
                <CurrentOrder 
                    handleDelete={handleDelete}
                    orderItems={order}
                    handleQuantity={handleQuantity}
                    handlePlaceOrder = {handlePlaceOrder}
                    buttonState = {placingOrder}
                    totalOrderValue = {totalOrderValue}
                />
            </div>
        </div>

    </div>
  )
}

export default NewOrderPage