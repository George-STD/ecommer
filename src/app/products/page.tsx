import React from 'react'
import FrameMotion from '@/app/_components/FrameMotion/FrameMotion';
import MainProduct from '../_components/MainProduct/MainProduct'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fresh Cart Products',
  description: 'E-Commerce App For Shopping.',
};
export default function page() {
  return (
    <FrameMotion>
      <div className="container py-8">
        <MainProduct />
      </div>
    </FrameMotion>
  )
}
