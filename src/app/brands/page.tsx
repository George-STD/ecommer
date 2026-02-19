import { Metadata } from 'next';
import React from 'react'
import ALLBrands from '../_components/ALLBrands/ALLBrands';

export const metadata: Metadata = {
  title: 'Fresh Cart Brands',
  description: 'E-Commerce App For Shopping.',
};
export default function page() {

  return (<>
    <div className="container py-8">
      <ALLBrands />
    </div>
  </>)
}
