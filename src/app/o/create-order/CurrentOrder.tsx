'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import OrderItem from './OrderItem'
import { Item } from '@/models/item.model'
import {z} from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

type currentOrderProps = {
    orderItems : OrderItems[]
    handleDelete : (_id:String) => void
    handleQuantity : (_id:String,change:number) => void
    handlePlaceOrder : (phoneNo:string,tableNo:string) => Promise<boolean>
    buttonState : boolean
    totalOrderValue : number
}

const orderSchema = z.object({
    phoneNo: z.string().max(10, "Phone number must be at least 10 digits").regex(/^\d+(\.\d+)?$/,"Only contains numbers"),
    tableNo: z.string().min(1, ",Table number is required").regex(/^\d+$/, "Table number must be a valid number"),
  });


function CurrentOrder({handleDelete,orderItems,handleQuantity,handlePlaceOrder,buttonState,totalOrderValue}:currentOrderProps) {
    
    const [phoneNo,setPhoneNo] = useState('');
    const [tableNo,setTableNo] = useState('');    
    const [errors, setErrors] = useState<{ phoneNo?: string; tableNo?: string }>({});


    const handleValidation = () => {
        const result = orderSchema.safeParse({ phoneNo, tableNo });
    
        if (!result.success) {
          // Extract and set validation errors
          const validationErrors = result.error.flatten().fieldErrors;
          setErrors({
            phoneNo: validationErrors.phoneNo?.[0],
            tableNo: validationErrors.tableNo?.[0],
          });
          return false;
        }
    
        setErrors({});
        return true;
      };

    const handelSubmit = async () =>{
        const validation = handleValidation();
        if(!validation) return;
        const result = await handlePlaceOrder(phoneNo,tableNo)
        if(result){
            setPhoneNo('');
            setTableNo('');
        }
    }

  return (
    <div className='w-full h-[600px] flex flex-col justify-between pb-3 border border-slate-600 rounded-xl'>
        <div className=' h-[90%]'>
            <div className='bg-blue-400 rounded-t-xl'>
                <h1 className='p-2 text-xl font-bold text-center'>Current Order</h1>
            </div>
            <div className='mt-3 space-y-2 overflow-y-scroll h-[89%]'>
                {
                    orderItems!.length<=0 ?
                        <></>
                        :
                        orderItems.map((item,idx)=>{
                            return <OrderItem 
                                        handleDelete={handleDelete}
                                        orderItem = {item}
                                        handleQuantity = {handleQuantity}
                                        key={idx}
                                    />
                        })
                }
                
            </div>
        </div>
        <div className='flex px-5 justify-between  '>
            <h1 className='my-auto text-2xl font-sans font-bold'>Total : {totalOrderValue}</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button 
                        variant={"destructive"} 
                        type="submit"
                    >
                        Place Order
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Customer Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Phone no.
                            </Label>
                            <Input
                                id="phoneNo"
                                value = {phoneNo}
                                onChange={(e)=>{setPhoneNo(e.target.value)}}
                                placeholder="Enter Phone Number"
                                className="col-span-3"
                            />
                            
                        </div>
                        {errors.phoneNo && <p className="text-red-500 text-sm w-full ml-3 -mt-3">{errors.phoneNo}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Table No.
                            </Label>
                            <Input
                                id="username"
                                value={tableNo}
                                onChange={(e)=>setTableNo(e.target.value)}
                                placeholder='Enter Tabel Number'
                                className="col-span-3"
                            />
                        </div>
                        {errors.tableNo && <p className="text-red-500 text-sm w-full ml-3 -mt-3">{errors.tableNo}</p>}

                    </div>
                    <DialogFooter>
                        <Button 
                            variant={"destructive"} 
                            onClick={handelSubmit} 
                            disabled={buttonState}
                            type="submit"
                        >
                            Place Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            
        </div>
    </div>
  )
}

export default CurrentOrder