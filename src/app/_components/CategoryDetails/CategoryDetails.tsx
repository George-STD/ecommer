'use client'
import getSpacificCategories from '@/api/getSpasificCategories.api'
import { CardTitle } from '@/components/ui/card';
import { SpacificCategoryType } from '@/types/categories.type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface CategoryDetailsProps {
  id: string;
}

export default function CategoryDetails({ id }: CategoryDetailsProps) {
  const [cateDate, setCateDate] = useState<SpacificCategoryType|null>(null);
  async function handleSpasificCategorie() {
    const data = await getSpacificCategories(id);
    setCateDate(data);
    console.log(data);
  }
  useEffect(() => {
    handleSpasificCategorie();
  }, [id]);
  return (
    <div className='container py-20'>
      <div className="flex items-center gap-20 justify-center">
        <div className="w-2xs">
            <CardTitle className='relative'>
              {typeof cateDate?.image === 'string' && cateDate.image !== '' && (
                <Image src={cateDate.image} alt={cateDate?.name || ''} width={500} height={500} className='object-cover w-full rounded-4xl shadow-2xl' />
              )}
            </CardTitle>
        </div>
        <div className="col-span-8 space-y-4 py-32 px-10">
          <h2 className='text-2xl font-semibold'>{cateDate?.name}</h2>
          <h3 className='text-lg'>{cateDate?.slug}</h3>
          <p className='text-slate-500'>{cateDate?.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
