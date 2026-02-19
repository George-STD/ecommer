import removeProductsFromCart from '@/api/removeFromCart.api'
import updateProductCount from '@/api/updateProductCountCart.api'
import { CartContext } from '@/context/cart.context'
import { CartProductType } from '@/types/cart.type'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function CartProducts({ product }: { product: CartProductType }) {

    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(CartContext);

    async function handleRemoveFromCart() {
        setIsLoading(true);
        try {
            const data = await removeProductsFromCart(product.product.id);
            if (data.status == 'success') {
                toast.success('Product Removed Successfully', { position: 'top-right', duration: 2000 });
                context?.handleCart();
                console.log(data);
            }
        } catch (error) {
            toast.error('Error Occured', { position: 'top-right', duration: 2000 })
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    async function handleUpdateCount(newCount: number) {
        setIsLoading(true)
        try {
            const data = await updateProductCount(product.product.id, newCount);
            if (data.status) {
                toast.success('Product Is Updated Successfully', { position: 'top-right', duration: 2000 });
                context?.handleCart();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error Occured', { position: 'top-right', duration: 2000 })
        } finally {
            setIsLoading(false)
        }
    }

    return (<>
        <div className='flex justify-between items-center  py-8 px-10'>
            <div className='flex gap-3'>
                <Image src={product.product.imageCover} alt={product.product.title} width={500} height={500} className='w-25 rounded-2xl' />
                <div className='flex flex-col justify-between'>
                    <div>
                        <h3 className='text-black text-lg font-semibold'>{product.product.title}</h3>
                        <h4 className='mx-2 my-1 text-slate-600'>price : {product.price} X <span className='text-black'>{product.count}</span> = {product.price * product.count} EGP</h4>
                    </div>
                    <button disabled={isLoading} onClick={handleRemoveFromCart} className='bg-black/85 cursor-pointer text-white rounded-full hover:bg-red-700 hover:outline-black/50 hover:outline-1 hover:outline-solid px-4 py-1 w-30 flex justify-center gap-2 items-center disabled:bg-black/15 disabled:cursor-not-allowed '><Trash2 /> Remove</button>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3'>
                <button className='bg-black text-white rounded-xl w-10 h-10 text-xl cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300' disabled={isLoading} onClick={() => handleUpdateCount(product.count - 1)}>-</button>
                <h4 className='text-xl'>{isLoading ? <i className='fa-solid fa-spinner fa-spin text-black'></i> : product.count}</h4>
                <button className='bg-black text-white rounded-xl w-10 h-10 text-xl cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300' disabled={isLoading} onClick={() => handleUpdateCount(product.count + 1)}>+</button>
            </div>
        </div>
    </>)
}
