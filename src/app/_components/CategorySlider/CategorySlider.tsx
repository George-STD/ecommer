import getAllCategories from '@/api/categories.api';
import React from 'react'
import { CategoryType } from '@/types/product.type';
import SwiperCard from '../SwiperCard/SwiperCard';

export default async function CategorySlider() {

    const allCategories: CategoryType[] = await getAllCategories();

    return (
        <>
            <SwiperCard allCategories={allCategories} />
        </>
    )
}
