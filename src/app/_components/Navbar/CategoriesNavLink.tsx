import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getAllCategories from '@/api/categories.api';

interface CategoriesNavLinkProps {
  className?: string;
}

export default function CategoriesNavLink({ className }: CategoriesNavLinkProps) {
  const [firstCategoryId, setFirstCategoryId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      if (categories && categories.length > 0) {
        setFirstCategoryId(categories[0]._id);
      }
    }
    fetchCategories();
  }, []);

  if (!firstCategoryId) {
    return <span>Categories</span>;
  }

  return <Link href={`/categories/${firstCategoryId}`} className={className}>Categories</Link>;
}