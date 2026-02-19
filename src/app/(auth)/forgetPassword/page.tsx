'use client'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ForgetSchema, ForgetType } from "@/schema/auth.schema"

export default function ForgetPassword() {

    const router = useRouter();

    const myForm = useForm<ForgetType>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(ForgetSchema),
        mode: 'all'
    });

    async function handelForget(values: ForgetType) {
        const loadingId = toast.loading('Loading.....', { position: 'top-center' })
        try {
            const options = { url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', method: 'POST', data: values };
            const { data } = await axios.request(options);
              if (data.statusMsg == 'success') {
                toast.success('Code Sent To Your Mail', { position: 'top-center', duration: 2500 });
                router.push('/verifyCode')
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
            <h1 className='text-3xl font-semibold my-5'>Forget Password</h1>
            <Form {...myForm}>
                <form action="" onSubmit={myForm.handleSubmit(handelForget)} className='space-y-3'>
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
                    <div className='flex justify-center items-center'>
                        <Button className='w-1/3 py-4 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Forget Password</Button>
                    </div>
                </form>
            </Form >
        </div >
    )
}
