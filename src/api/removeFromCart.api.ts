'use server'
import getMyToken from "@/utilities/GetMyToken";

export default async function removeProductsFromCart(id:string) {
    const token = await getMyToken();
    if (!token) {
        return { status: 'error', message: 'No token found' };
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method:'DELETE',
        headers: { token: token as string, "Content-Type": "application/json" }
    });
    if (!response.ok) {
        return { status: 'error', message: 'Failed to remove product' };
    }
    const data = await response.json();
    return data
}
