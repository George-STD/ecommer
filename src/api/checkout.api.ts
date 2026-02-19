import { CheckOutType } from "@/schema/checkout.schema"
import getMyToken from "@/utilities/GetMyToken"

export default async function makeOnlinePayment(cartId:string , domain:string , formValue:CheckOutType){
    const token = await getMyToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${domain}`,{
        method:'POST',
        headers:{token:token as string , "Content-Type": "application/json"},
        body:JSON.stringify({
            shippingAddress:formValue
        })
    });
    const data = await response.json()
    return data
}

export async function makeCashPayment(cartId:string , formValue:CheckOutType){
    const token = await getMyToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        method:'POST',
        headers:{token:token as string , "Content-Type": "application/json"},
        body:JSON.stringify({
            shippingAddress:formValue
        })
    });
    const data = await response.json()
    return data
}