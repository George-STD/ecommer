'use client'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ResetSchema, ResetType } from "@/schema/auth.schema"
import { useState } from "react"

export default function ResetPassword() {

    const router = useRouter();
    const [isPassword, setIsPassword] = useState(true)

    const myForm = useForm<ResetType>({
        defaultValues: {
            email: "",
            newPassword: ''
        },
        resolver: zodResolver(ResetSchema),
        mode: 'all'
    });

    async function handelReset(values: ResetType) {
        const loadingId = toast.loading('Loading.....', { position: 'top-center' })
        try {
            const options = { url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword', method: 'PUT', data: values };
            const { data } = await axios.request(options);
            if (data.statusMsg == 'success') {
                toast.success('Password Change Successfullu', { position: 'top-center', duration: 2500 });
                router.push('/login')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message, { position: 'top-center', duration: 2500 })
            }
        } finally {
            toast.dismiss(loadingId)
        }
    }

    return (
        <div className='w-1/2 mx-auto my-12'>
            <h1 className='text-3xl font-semibold my-5'>Reset Password</h1>
            <Form {...myForm}>
                <form action="" onSubmit={myForm.handleSubmit(handelReset)} className='space-y-3'>
                    {/* EMAIL */}
                    <FormField control={myForm.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    {/* NEWPASSWORD */}
                    <FormField control={myForm.control} name='newPassword' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>New Password</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input {...field} type={isPassword ? 'password' : 'text'} />
                                    {isPassword ? (
                                        <i className="fa-regular fa-eye absolute top-2.5 end-4 cursor-pointer"
                                            onClick={() => setIsPassword(false)}></i>) : (
                                        <i className="fa-regular fa-eye-slash absolute top-2.5 end-4 cursor-pointer"
                                            onClick={() => setIsPassword(true)}></i>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    <div className='flex justify-center items-center'>
                        <Button className='w-1/3 py-4 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Submit</Button>
                    </div>
                </form>
            </Form >
        </div >
    )
}
