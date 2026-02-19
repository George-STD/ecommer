'use client'
import makeOnlinePayment, { makeCashPayment } from '@/api/checkout.api'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CartContext } from '@/context/cart.context'
import { checkOutSckema, CheckOutType } from '@/schema/checkout.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Metadata } from 'next'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

export const mdata: Metadata = {
  title: 'Fresh Cart Check Out',
  description: 'E-Commerce App For Shopping.',
};
export default function CheckOut() {
    const { id }: { id: string } = useParams();
    const [paymentFlag, setPaymentFlag] = useState('');
    const router = useRouter();
    const context = useContext(CartContext);

    const myForm = useForm<CheckOutType>({
        defaultValues: {
            details: '',
            phone: '',
            city: ''
        },
        resolver: zodResolver(checkOutSckema),
        mode: 'all'
    })

    async function handleCheckOut(values: CheckOutType) {

        if (paymentFlag == 'cash') {
            const data = await makeCashPayment(id, values);
            context?.handleCart();
            router.push('/allorders')
        } else {
            const data = await makeOnlinePayment(id, 'http://localhost:3000', values);
            if (data.status == 'success') {
                window.location.href = data.session.url
            }
        }
    }

    return (<>
        <div className="container px-42 my-15">
            <h1 className='text-3xl font-semibold my-2'>CHECK OUT</h1>
            <Form {...myForm}>
                <form action="" onSubmit={myForm.handleSubmit(handleCheckOut)} className='space-y-3'>
                    {/* details */}
                    <FormField control={myForm.control} name='details' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>Details</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    {/* phone */}
                    <FormField control={myForm.control} name='phone' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    {/* city */}
                    <FormField control={myForm.control} name='city' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>City</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    <div className='w-full flex justify-center items-center gap-6'>
                        <Button onClick={() => setPaymentFlag('online')} className='w-1/5 py-4 bg-black hover:bg-blue-700 hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Online Payment</Button>
                        <Button onClick={() => setPaymentFlag('cash')} className='w-1/5 py-4 bg-black hover:bg-green-700 hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Cash Payment</Button>
                    </div>
                </form>
            </Form >
        </div>
    </>)
}
