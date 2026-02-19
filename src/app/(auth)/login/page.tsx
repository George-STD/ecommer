'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, LoginType } from '@/schema/auth.schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, SignInResponse } from 'next-auth/react'

export default function Login() {

  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true)

  const myForm = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: 'all'
  });

  async function handelLogin(values: LoginType) {
    const response:SignInResponse|undefined = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success('Logged In Successfully', { position: 'top-center', duration: 2000 });
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } else {
      toast.error(response?.error, { position: 'top-center', duration: 2000 })
    }
  };

  return (
    <div className='w-1/2 mx-auto my-12'>
      <h1 className='text-3xl font-semibold my-5'>Login</h1>
      <Form {...myForm}>
        <form action="" onSubmit={myForm.handleSubmit(handelLogin)} className='space-y-3'>
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
          <div className='flex justify-between items-center'>
            <Button className='w-1/5 py-4 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer ' >Login</Button>
            <Link href={'/forgetPassword'} className='text-blue-400 underline'>Forget Password</Link>
          </div>
          <div className='text-center'>
            <h3>Don't Have An Account ? <Link className='text-blue-400 underline' href={'/register'}>Register Now</Link></h3>
          </div>
        </form>
      </Form >
    </div >
  )
}
