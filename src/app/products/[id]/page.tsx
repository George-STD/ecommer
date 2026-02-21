import getProductDetails from '@/api/productDetails.api';
import getRelatedProducts from '@/api/relatedProducts.api';
import FrameMotion from '@/app/_components/FrameMotion/FrameMotion';
import ProductDetails from '@/app/_components/ProductDetails/ProductDetails';
import ProductSwiper from '@/app/_components/ProductSwiper/ProductSwiper';
import { ProductType } from '@/types/product.type';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const productDetails: ProductType = await getProductDetails(id);

    const relatedProducts: ProductType[] = await getRelatedProducts(productDetails.category._id);

    return (<>
        <FrameMotion>
            <div className="container py-20">
                <div className="grid grid-cols-12 gap-20">
                    <ProductDetails productDetails={productDetails} />
                </div>
                <h2 className='text-3xl font-semibold py-10'>Related Products</h2>
                <ProductSwiper relatedProducts={relatedProducts} />
            </div>
        </FrameMotion>
    </>)
}
