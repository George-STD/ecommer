'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterType } from '@/schema/auth.schema'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Register() {

  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true)

  const myForm = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(RegisterSchema),
    mode: 'all'
  });

  async function handelRegister(values: RegisterType) {
    const loadingId = toast.loading('Loading.....', { position: 'top-center' })
    try {
      const options = { url: 'https://ecommerce.routemisr.com/api/v1/auth/signup', method: 'POST', data: values };
      const { data } = await axios.request(options);

      if (data.message == 'success') {
        toast.success('Account Created Successfully', { position: 'top-center', duration: 2500 });
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
      <h1 className='text-3xl font-semibold my-5'>Register</h1>
      <Form {...myForm}>
        <form action="" onSubmit={myForm.handleSubmit(handelRegister)} className='space-y-3'>
          {/* NAME */}
          <FormField control={myForm.control} name='name' render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )} />
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
          {/* PASSWORD */}
          <FormField control={myForm.control} name='password' render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Password</FormLabel>
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
          {/* REPASSWORD */}
          <FormField control={myForm.control} name='rePassword' render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Confirm Password</FormLabel>
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
          {/* PHONE */}
          <FormField control={myForm.control} name='phone' render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )} />
          <div className='flex justify-center'>
            <Button className='w-1/3 py-4 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer dark:text-white dark:hover:text-black dark:outline-1 dark:outline-white dark:outline-solid ' >Register</Button>
          </div>
        </form>
      </Form >
    </div >
  )
}
