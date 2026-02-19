import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import amazonLogo from '@/../public/images/amazon-pay.png'
import american from '@/../public/images/American-Express-Color.png'
import mastercard from '@/../public/images/mastercard.webp'
import paypal from '@/../public/images/paypal.png'
import apples from '@/../public/images/get-apple-store.png'
import googles from '@/../public/images/get-google-play.png'
import Image from 'next/image'

export default function Footer() {
  return (<>
    <div className='w-full bg-slate-200 py-10 relative bottom-0 left-0 right-0 dark:bg-gray-600'>
      <div className="container">
        <div>
          <h3 className='text-2xl pb-2'>Get The Fresh Cart App</h3>
          <p className='text-gray-600'>We Will Send You a Link, Open It On Your Phone To Download The App</p>
          <div className='flex px-8 py-4'>
            <Input placeholder='Email...' className='bg-white me-2' />
            <Button>Share App Link</Button>
          </div>
          <div className='footerBottom flex flex-col lg:flex-row border-black/25 border-solid border-t-2 border-b-2 p-4 ps-8 justify-between mb-6'>
            <div className="right flex justify-center items-center">
              <h3 className='text-lg'>Payment Partners</h3>
              <div className='flex px-3 gap-2 items-center'>
                <Image className='w-13' src={amazonLogo} alt='Amazon-Pay-Logo' />
                <Image className='w-13' src={american} alt='American-Express-logo' />
                <Image className='w-13' src={mastercard} alt='Mastercard-Logo' />
                <Image className='w-13' src={paypal} alt='Paypal-Logo' />
              </div>
            </div>
            <div className="left flex justify-center items-center">
              <h3 className='text-lg'>Get Deliveries with FreshCart</h3>
              <div className='flex px-3 gap-2 items-center justify-center'>
                <Image className='w-30' src={apples} alt='get-apple-store-Logo' width={500} />
                <Image className='w-34' src={googles} alt='get-google-play-logo' width={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>)
}
