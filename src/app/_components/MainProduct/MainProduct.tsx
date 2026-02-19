import { ProductType } from '@/types/product.type'
import React from 'react'
import getAllProducts from "@/api/product.api";
import ProductCard from '../ProductCard/ProductCard'

export default async function MainProduct() {
    const allProducts: ProductType[] = await getAllProducts() || [];
    return (
        <>
            <h2 className='text-3xl font-semibold pt-4'>All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {allProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
        </>
    )
}
