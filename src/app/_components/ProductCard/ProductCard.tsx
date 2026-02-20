import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { ProductType } from '@/types/product.type';
import Link from 'next/link';
import Image from 'next/image';
import MyButton from '../myButton/MyButton';

export default function ProductCard({ product }: { product: ProductType }) {
    return (<>
        <Card className='group p-1.5 pt-4 pb-3'>
            <CardHeader>
                <CardTitle className='relative'>
                    <Image src={product.imageCover} alt={product.title} width={500} height={500} className='object-cover rounded-lg' />
                    <div className="flex justify-center items-center gap-3 layer absolute inset-0 bg-black/40 opacity-0 rounded-lg group-hover:opacity-100 transition-all duration-500">
                        <ShoppingCart className='text-white w-8 h-8 p-1.5 rounded-full cursor-pointer hover:text-black hover:bg-white transition-all duration-300' />
                        <Link href={`/products/${product._id}`}> <Eye className='text-white w-8 h-8 p-1.5 rounded-full cursor-pointer hover:text-black hover:bg-white transition-all duration-300' /> </Link>
                        <Heart className='text-white w-8 h-8 p-1.5 rounded-full cursor-pointer hover:text-black hover:bg-white transition-all duration-300' />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className=''>{product.category.name}</CardDescription>
                <p className='line-clamp-1 text-blue-800 font-semibold text-lg'>{product.title}</p>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div className="price"><h5>{product.price} EGP</h5></div>
                    <div className="rating"><h5 className='flex gap-1'>{product.ratingsAverage} <Star className='fill-yellow-500 text-yellow-500' /></h5></div>
                </div>
            </CardFooter>
            <MyButton id={product._id} />
        </Card>
    </>
    )
}
