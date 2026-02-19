'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { CategoryType } from '@/types/product.type';
import { Autoplay, FreeMode } from 'swiper/modules';
import Link from 'next/link';

export default function SwiperCard({ allCategories }: { allCategories: CategoryType[] }) {
    return (
        <>
            <h2 className='text-3xl font-semibold py-2 '>All Categories</h2>
            <Swiper slidesPerView={5} spaceBetween={5} modules={[Autoplay, FreeMode]}
                autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={true} speed={4000} freeMode={true}>
                {allCategories.map((category) => (
                    <SwiperSlide>
                        <Link key={category._id} href={`/categories/${category._id}`} passHref>
                            <>
                                <Image src={category.image} alt={category.name} width={500} height={500} className='w-full object-cover h-60 rounded-2xl' />
                                <h3 className='font-semibold text-center'>{category.name}</h3>
                            </>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
