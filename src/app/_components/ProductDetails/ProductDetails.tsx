import { ProductType } from '@/types/product.type'
import { Star } from 'lucide-react'
import React from 'react'
import MyButton from '../myButton/MyButton'
import Image from 'next/image'

export default function ProductDetails({productDetails}: { productDetails: ProductType }) {
    return (<>
        <div className="col-span-4">
            {/* <img src={productDetails.imageCover} alt="" className='w-full rounded-4xl shadow-2xl' /> */}
            <Image src={productDetails.imageCover} alt={productDetails.title} width={500} height={500} className='w-full rounded-4xl shadow-2xl' />
        </div>
        <div className="col-span-8 space-y-4 py-32 px-10">
            <h2 className='text-2xl font-semibold'>{productDetails.title}</h2>
            <h3 className='text-lg'>{productDetails.category.name}</h3>
            <p className='text-slate-500'>{productDetails.description}</p>
            <div className="flex justify-between items-center w-full">
                <div className="price"><h5>{productDetails.price} EGP</h5></div>
                <div className="rating"><h5 className='flex gap-1'>{productDetails.ratingsAverage} <Star className='fill-yellow-500 text-yellow-500' /></h5></div>
            </div>
            <div className='flex justify-center'>
                {/* <Button className='w-1/2 bg-black hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer mx-6 ' >Add To Cart</Button> */}
                <MyButton id={productDetails._id} className='w-1/2' />
            </div>
        </div>
    </>)
}
