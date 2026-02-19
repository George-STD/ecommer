import { Metadata } from 'next';
import React from 'react'
import CategorySlider from '../../_components/CategorySlider/CategorySlider';
import CategoryDetails from '@/app/_components/CategoryDetails/CategoryDetails';

export const metadata: Metadata = {
  title: 'Fresh Cart All Categories',
  description: 'E-Commerce App For Shopping.',
};
export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <div className="container">
        <div className='p-10'>
          <CategorySlider />
          <CategoryDetails id={id} />
        </div>
      </div>
    </>
  )
}
