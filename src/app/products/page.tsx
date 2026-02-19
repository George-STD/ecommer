import React from 'react'
import MainProduct from '../_components/MainProduct/MainProduct'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fresh Cart Products',
  description: 'E-Commerce App For Shopping.',
};
export default function page() {
  return (
    <>
      <div className="container py-8">
          <MainProduct />
      </div>
    </>
  )
}
