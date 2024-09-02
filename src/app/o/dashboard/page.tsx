'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/components/card'
import more from '@/assets/more.svg'
import dollar from '@/assets/dollar.svg'
import rocket from '@/assets/rocket.svg'
import customer from '@/assets/customer.svg'
import Image from 'next/image'
import axios from 'axios'
import Chart from "@/app/o/dashboard/Chart"
import OrderChart from "@/app/o/dashboard/OrderChart"
import { DataTable } from '@/components/data-table'
import { columns } from './columns'


export interface MonthDetails extends Document {
    month : number,
    year :  number,
    revenue : number,
    orders : number,
    customer : number
}

// export interface RevenueDetails extends Document {
//     totalRevenue : number,
//     totalCount : number,
//     totalCustomer : number,
// }
type RevenueDetails = {
    totalRevenue: number;
    totalCount: number;
    customers : number,     
    items : number
};





function DashBoardPage() {

    const [revenueDetails,setRevenueDetails] = useState<RevenueDetails>()
    const [revenueChart,setRevenueChart] = useState([])
    const[criticalStock,setCriticalStock] = useState([])


    useEffect(()=>{
        const featchDetails = async () =>{
            try {
                const res = await axios.get('/api/order/this-month-revenue')
                setRevenueDetails(res.data.data)
                console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                console.log(res)
            } catch (error) {
                console.log("------------------------------------------------------")
                const revenue : RevenueDetails =  {
                    totalRevenue : 0,
                    totalCount : 0,
                    customers : 0,
                    items : 0
                }
                setRevenueDetails(revenue)
              console.log(error)
            }
        }
        const fecthCriticalItems = async ()=>{
            try {
                const res = await axios('/api/items/out-of-stock')
                setCriticalStock(res.data.data)
            } catch (error) {
                
            }
        }
        featchDetails()
        fecthCriticalItems()
    },[])
    useEffect(()=>{
        console.log(revenueChart)
    },[revenueChart])

  return (
    
    
    revenueDetails!=undefined &&<div className=" w-full mx-3 p-3 ml-56">
        <h1 className=" my-3 text-2xl font-semibold">DashBoard</h1>
        <div className='grid gap-8 grid-cols-4 h-32 mt-7'>
            <Card image={dollar}  value={revenueDetails!.totalRevenue} name="Revenue"/>
            <Card image={rocket}  value={revenueDetails!.totalCount} name="Orders"/>
            <Card image={more}  value={revenueDetails.items} name="Items"/>
            <Card image={customer}  value={revenueDetails!.customers} name="Customers"/>
        </div>
        <div className='grid gap-8 grid-cols-2 mt-5'>
            <div className='h-full'>
                <Chart />
            </div>
            <div className=''>
                <OrderChart />
            </div>
        </div>
        <div className='mt-5 bg-white'>
            <h1 className='text-3xl font-bold text-red-500 mb-[-10px] pt-2 text-center'>Critical Stock</h1>
            <DataTable columns={columns} data={criticalStock}/>
        </div>



    </div>
  )
}

export default DashBoardPage