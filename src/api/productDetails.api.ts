'use server'
export default async function getProductDetails(id:string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    if (!response.ok) {
        return null;
    }
    const { data } = await response.json();
    return data || null;
};