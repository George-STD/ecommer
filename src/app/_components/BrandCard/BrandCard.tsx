import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BrandType } from '@/types/brand.type';



export default function BrandCard({ data }:{data:BrandType}) {
    return (
        <div>
            <Card className='group p-1.5 pt-4 pb-3'>
                <CardHeader>
                    <CardTitle className='relative'>
                        {data.image && (
                            <Image src={data.image} alt={data.name} width={200} height={200} className='object-cover' />
                        )}
                        <div className="flex justify-center items-center gap-3 layer absolute inset-0 bg-black/40 opacity-0 rounded-lg group-hover:opacity-100 transition-all duration-500">
                            <Link href={`/brands/${data._id}`}> <Eye className='text-white w-8 h-8 p-1.5 rounded-full cursor-pointer hover:text-black hover:bg-white transition-all duration-300' /> </Link>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='line-clamp-1 text-blue-800 font-semibold text-lg'>{data.name}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-between items-center w-full">
                        <div className="text"><h5>{data.createdAt.split('T')[0]}</h5></div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
