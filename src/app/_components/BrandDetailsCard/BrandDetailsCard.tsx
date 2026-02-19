'use client'
import getSpecificBrand from '@/api/getSpecificBrand.api';
import { BrandType } from '@/types/brand.type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function BrandDetailsCard({ id }: { id: string }) {
    const [brandData, setBrandData] = useState<BrandType | null>(null);
    async function handleSpasificBrand() {
        const data: BrandType = await getSpecificBrand(id);
        setBrandData(data);
        console.log(data);
    }
    useEffect(() => {
        handleSpasificBrand();
    }, [id]);
    if (!brandData) {
        return <>
            <div className='h-screen flex justify-center items-center'>
                <i className='fa-solid fa-spinner fa-spin text-6xl text-black'></i>
            </div>
        </>;
    }
    return (
        <div>
            <div className="container py-10 flex flex-col items-center">
                {brandData.image && (
                    <Image src={brandData.image} alt={brandData.name} width={300} height={300} className="rounded-lg shadow-lg mb-4" />
                )}
                <h1 className="text-2xl font-bold mb-4">{brandData.name}</h1>
                <p className="text-gray-500 mb-2">Slug: {brandData.slug}</p>
                <p className="text-gray-400 text-sm">Created at: {new Date(brandData.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
