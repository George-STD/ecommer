'use server'
export default async function getSpacificCategories(cateId:string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${cateId}`);
    if (!response.ok) {
        return [];
    }
    const { data } = await response.json();
    return data || [];
};