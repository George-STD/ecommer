'use client'
import addProductToCart from '@/api/addToCart.api'
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { CartContext } from '@/context/cart.context';
import { useRouter } from 'next/navigation';

export default function MyButton({ id, className }: { id: string; className?: string }) {

    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(CartContext);
    const router = useRouter()

    async function handleAddToCart() {
        try {
            setIsLoading(true);
            const data = await addProductToCart(id);
            if (data.status == 'success') {
                context?.handleCart();
                toast.success('The Product Add To Cart Successfully',{position:'top-right', duration:2000})
            }
        } catch (error) {
            toast.error('Login To Add Products To Cart', {position:'top-center', duration: 4000 });
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
    };
    return <>
        <Button onClick={handleAddToCart} disabled={isLoading}
            className={`bg-black text-white hover:bg-white hover:text-black hover:outline-2 hover:outline-black hover:outline-solid cursor-pointer mx-6 disabled:cursor-not-allowed ${className || ''}`}
        >
            {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Add To Cart
        </Button>
    </>
}
