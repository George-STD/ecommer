'use server'
import getMyToken from "@/utilities/GetMyToken";

export default async function addProductToCart(id: string) {
    const token = await getMyToken();
    if (!token) {
        throw new Error('Login To Add To Cart');
    }
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers: { token: token as string, "Content-Type": "application/json" }
    });
    if (!response.ok) {
        return { status: 'error', message: 'Failed to add product to cart' };
    }
    const data = await response.json();
    return data
}
