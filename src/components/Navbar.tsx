import React from 'react'
import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"


function Navbar() {
    return (
        <div className='bg-white flex flex-row justify-between rounded-lg w-52 h-[720px] fixed overflow-hidden'>
            <div className='pl-2 py-4 h-full mr-4 w-full'>
                <div className='text-3xl font-bold px-2 flex justify-between'>
                        Baristo
                </div>
                    
                <div className=' mt-20 mx-2 w-full pr-2'>
                    <Accordion type="single" collapsible>
                        <h1 className=' flex flex-1 items-center justify-between py-4 font-medium border-b'> 
                            <Link href="/o/dashboard">Dashboard</Link>
                        </h1>
                        <h1 className=' flex flex-1 items-center justify-between py-4 font-medium border-b'>
                            <Link href="/o/orders"> All Orders </Link>
                        </h1>
                            
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Menu</AccordionTrigger>
                            <AccordionContent >
                                <Link href="/o/menu">Menu List</Link>
                            </AccordionContent>
                            <AccordionContent >
                                <Link href="/o/categories">Categories</Link>
                            </AccordionContent>
                            <AccordionContent >
                                <Link href="/o/add-item">Add Item</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                    
            </div>
        </div>

    )
}

export default Navbar
