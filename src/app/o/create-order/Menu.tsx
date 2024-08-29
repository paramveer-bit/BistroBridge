'use client'


import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Category } from '@/models/category.model'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import axios from 'axios'
import ItemSelection from './ItemSelection'
import { Item } from '@/models/item.model'

type menuProps = {
    addOrderItem : (item:Item) => void
} 

function Menu({addOrderItem}:menuProps) {


    const[loading,setLoading] = useState(false)
    const[categories,setCategories] = useState<Category[]>([])
    const[itemLoading,setItemLoading] = useState(false)
    const[items,setItems] = useState<Item[]>([])

    useEffect(()=>{
        const fetchCategory = async ()=>{
          setLoading(true)
            try{
                const res = await axios.get('/api/category/getall')
                setCategories(res.data.data)
                console.log(res.data.data)
            }catch{
              console.log("Error Occur while fetching")
            }
            finally {
              setLoading(false)
            }

        }
        fetchCategory()
    },[])

    const fetchItem = async (categoryId:string) => {
        try {
            setItemLoading(false)
            const res = await axios.post('/api/category/item',{ categoryId })
            console.log(res.data)
            setItems(res.data.data)
        } catch (error) {
            console.log("Some error occured while fectching this category items");
            console.log(error)   
        } finally{
            setItemLoading(true)
        }
    }


  return (
    <div className='w-full '>
        <Accordion type="single" collapsible className="w-full">
            {
                categories.map((category,idx)=>{
                    return (
                        <>
                            <AccordionItem value={`item-${idx}`}>
                                <AccordionTrigger className='px-5 text-xl font-bold' onClick={()=>{fetchItem(category._id)}}>
                                    {category.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {itemLoading ? 
                                        <>
                                            <ItemSelection data={items} addOrderItem={addOrderItem}/>
                                        </>
                                        :
                                        <Loader2 className='animate-spin w-16 h-16 my-auto mx-auto'/>
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        </>
                    )
                })
            }

        </Accordion>
    </div>
  )
}

export default Menu