'use server'
export default async function getAllCategories() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    if (!response.ok) {
        return [];
    }
    const { data } = await response.json();
    return data || [];
};