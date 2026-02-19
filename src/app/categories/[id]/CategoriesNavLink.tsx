import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getAllCategories from '@/api/categories.api';

export default function CategoriesNavLink() {
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

  return <Link href={`/categories/${firstCategoryId}`}>Categories</Link>;
}
