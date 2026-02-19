'use client'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { VerifySchema, VerifyType } from "@/schema/auth.schema"

export default function Verify() {

    const router = useRouter();

    const myForm = useForm<VerifyType>({
        defaultValues: {
            resetCode: "",
        },
        resolver: zodResolver(VerifySchema),
        mode: 'all'
    });

    async function handelVerify(values: VerifyType) {
        const loadingId = toast.loading('Loading.....', { position: 'top-center' })
        try {
            const options = { url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', method: 'POST', data: values };
            const { data } = await axios.request(options);
              if (data.statusMsg == 'success') {
                toast.success('Code Verified', { position: 'top-center', duration: 2500 });
                router.push('/resetPassword')
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
            <h1 className='text-3xl font-semibold my-5'>Verify Your Code</h1>
            <Form {...myForm}>
                <form action="" onSubmit={myForm.handleSubmit(handelVerify)} className='space-y-3'>
                    {/* EMAIL */}
                    <FormField control={myForm.control} name='resetCode' render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold'>Enter Your Vreify Code</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )} />
                    <div className='flex justify-center items-center'>
                        <Button className='w-1/3 py-4 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Verify</Button>
                    </div>
                </form>
            </Form >
        </div >
    )
}
