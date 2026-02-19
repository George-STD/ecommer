'use server'
export default async function getRelatedProducts(id:string){
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
    if (!response.ok) {
        return [];
    }
    const {data} = await response.json();
    return data || [];
}