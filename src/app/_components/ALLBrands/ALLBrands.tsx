import getAllBrands from '@/api/getAllBrands.api';
import React from 'react'
import BrandCard from '../BrandCard/BrandCard';
import { BrandType } from '@/types/brand.type';
import FrameMotion from '../FrameMotion/FrameMotion';

export default async function ALLBrands() {
    const result = await getAllBrands();
    const brands: BrandType[] = Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : [];

    return (
        <>
            <h2 className='text-3xl font-semibold py-4'>All Brands</h2>
            <FrameMotion>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {brands.map((brand) => (
                        <BrandCard key={brand._id} data={brand} />
                    ))}
                </div>
            </FrameMotion>
        </>
    )
}
