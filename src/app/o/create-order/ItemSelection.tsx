'use client'

import React from 'react'
import { Item } from '@/models/item.model'

type ItemSelectionProps = {
    data : Item[],
    addOrderItem : (item:Item) => void
}



function ItemSelection({data,addOrderItem}:ItemSelectionProps) {
  return (
    <div className='grid grid-cols-5 gap-3 p-4 '>
        {data.map((item)=>{
            return (
                <button 
                    className={`rounded-md flex flex-col justify-between p-2 border-2 hover:border-yellow-600 hover:border-[3px] ${item.stock<=0?"border-red-600 opacity-50 hover:border-red-600":""}`}
                    onClick={()=>addOrderItem(item)}
                    disabled={item.stock<=0}
                >
                    <img src={item.image} alt={item.name} className='h-28 rounded-lg'/>
                    <h1 className='font-semibold text-balance mt-2 pl-1'>{item.name}</h1>
                    <h2 className='text-lg font-bold mt-auto pl-3'>₹ {item.price}</h2>
                </button>
            )
        })}
        
    </div>
  )
}

export default ItemSelection