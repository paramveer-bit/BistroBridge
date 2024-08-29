
import { Button } from '@/components/ui/button'
import React from 'react'
import Plus from '@/assets/Plus.svg'
import Image from 'next/image'
import Minus from '@/assets/Minus.svg'
import Delete from '@/assets/Delete.svg'
import { Item } from '@/models/item.model'


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



type OrderItemProps = {
  handleDelete : (_id:String) => void
  orderItem : OrderItems
  handleQuantity : (_id:String,change:number) => void

}


function OrderItem({handleDelete,orderItem,handleQuantity}:OrderItemProps) {
  const handleIncrement = () => {
    console.log("calling twice")
    handleQuantity(orderItem._id, 1)
  }

  return (
    <div className='w-[90%] mx-auto flex items-center p-1 justify-between bg-slate-300 rounded-md'>
        <div className='font-bold -space-y-1 ml-4'>
          <h1>{orderItem.name}</h1>
          <h2 className='px-1'>₹ {orderItem.price}</h2>
        </div>
        <div className='flex space-x-3'>

          {/* Minus / Decrement Button */}
          <button
            onClick={()=>handleQuantity(orderItem._id,-1)}
          >
            <Image src={Minus} alt="" className='h-8 w-8 my-auto'/>
          </button>

          {/* Display Quantity */}
          <h2 className='my-auto text-lg font-extrabold'>
            {orderItem.quantity}
          </h2>

          {/* Plus / Increment Button */}
          <button
            onClick={handleIncrement}
          >
            <Image src={Plus} alt="" className='h-8 w-8 my-auto'/>
          </button>

          {/* Delete Button */}
          <button 
            onClick={()=>handleDelete(orderItem._id)}
          >
              <Image src={Delete} alt="" className='h-7 w-8' />
          </button>          
        </div>
    </div>
  )
}

export default OrderItem