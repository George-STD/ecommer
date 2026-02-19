'use client'
import getProductsFromCart from '@/api/getProductsFromCart.api'
import { ArrowDownCircle, ShoppingCart } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import CartProducts from '../_components/CartProducts/CartProducts'
import { Button } from '@/components/ui/button';
import ClearCart from '@/api/clearUserDataOnCart.api';
import Link from 'next/link';
import { toast } from 'sonner';
import { CartContext } from '@/context/cart.context';
import { CartType } from '@/types/cart.type';
import { Metadata } from 'next';

export const Mdata: Metadata = {
  title: 'Fresh Cart Cart',
  description: 'E-Commerce App For Shopping.',
};
export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(CartContext);
  const [cartData, setCartData] = useState<CartType|undefined>(undefined)

  async function handleGetProductsFromCart() {
    setIsLoading(true);
    const data = await context?.handleCart()
    setIsLoading(false);
    setCartData(data);
  };

  async function handleClearCart() {
    const data = await ClearCart();
    if (data.message == 'success') {
      context?.setAllProducts([]);
      toast.success('Cart Cleared Successfully', { position: 'top-center', duration: 2000 })
    }
  };

  useEffect(() => {
    handleGetProductsFromCart()
  }, []);

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <i className='fa-solid fa-spinner fa-spin text-6xl text-black'></i>
      </div>
    );
  }

  return (<>
    <div className="container">
      <div className='bg-slate-200 p-10 my-10 rounded-xl'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='flex items-center gap-3 text-3xl'> <ShoppingCart /> Shop Cart</h2>
            <h3 className='my-2 text-slate-600 text-lg'>total cart price : {context?.totalPrice} EGP </h3>
          </div>
          <Button onClick={handleClearCart} className='bg-red-600'>Clear Cart</Button>
        </div>
        <div className='bg-slate-100 rounded-lg'>
          {context?.allProducts?.length == 0 ?
            <div className='p-5 flex flex-col items-center gap-3'>
              <h2 className='text-xl flex gap-3 items-center'>Cart Is Empty ,Go Add Some Products From Here <ArrowDownCircle /></h2>
              <Link className='w-1/4 text-center bg-black text-white px-5 py-2 cursor-pointer rounded-lg hover:bg-white hover:text-black hover:outline-black hover:outline-2' href={'/products'}> Shop Now </Link>
            </div>
            : <>
              {context?.allProducts?.map((product) => <CartProducts key={product.product.id} product={product} />)}
              <div className='flex justify-center'>
                <Link href={`/checkout/${cartData?.cartId}`}>
                  <Button className='ms-auto m-4 bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:outline-1 hover:outline-black hover:outline-solid transition-all'>CHECKOUT </Button>
                </Link>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  </>)
}
