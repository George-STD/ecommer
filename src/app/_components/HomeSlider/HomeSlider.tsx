'use client'
import Image from "next/image";
import image1 from '../../../../public/images/slider-image-1.jpeg'
import image2 from '../../../../public/images/slider-image-2.jpeg'
import image3 from '../../../../public/images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, FreeMode } from 'swiper/modules';
import React from 'react'

export default function HomeSlider() {
    return (<>
        <div className="grid grid-cols-12">
            <div className="col-span-8">
                <Swiper slidesPerView={1} modules={[Autoplay, FreeMode]}
                    autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    loop={true} speed={3000} freeMode={true}>
                    <SwiperSlide> <Image src={image1} alt="Home Image 1" className="md:h-96 lg:h-[558]" width={1000} height={500} /> </SwiperSlide>
                    <SwiperSlide> <Image src={image2} alt="Home Image 2" className="md:h-96 lg:h-[558]" width={1000} height={500} /> </SwiperSlide>
                    <SwiperSlide> <Image src={image3} alt="Home Image 3" className="md:h-96 lg:h-[558]" width={1000} height={500} /> </SwiperSlide>
                </Swiper>
            </div>
            <div className="col-span-4">
                <Image src={image2} alt="Home Image 2" className="md:h-48 lg:h-[279]" width={500} height={500} />
                <Image src={image3} alt="Home Image 3" className="md:h-48 lg:h-[279]" width={500} height={500} />
            </div>
        </div>
    </>)
}
