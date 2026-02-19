'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ProductType } from '@/types/product.type';
import ProductCard from '../ProductCard/ProductCard';
import 'swiper/css/scrollbar';

export default function ProductSwiper({ relatedProducts }: { relatedProducts: ProductType[] }) {
    return (<>
        <Swiper spaceBetween={30} slidesPerView={5} modules={[Autoplay, FreeMode]}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true} speed={6000} freeMode={true}
        >
            {relatedProducts.map((product: ProductType) => <SwiperSlide key={product._id}><ProductCard product={product} /></SwiperSlide>)}
        </Swiper>
    </>)
}
