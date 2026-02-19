'use server'
import getMyToken from "@/utilities/GetMyToken";

export default async function getProductsFromCart() {
    const token = await getMyToken();
    if (!token) {
        return { status: 'error', message: 'No token found', data: { products: [] } };
    }
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: token as string, "Content-Type": "application/json" }
    });
    if (!response.ok) {
        return { status: 'error', message: 'Failed to get cart', data: { products: [] } };
    }
    const data = await response.json();
    return data
}
