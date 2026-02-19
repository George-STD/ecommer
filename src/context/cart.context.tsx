'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import getProductsFromCart from '../api/getProductsFromCart.api';
import { CartProductType, CartType } from '@/types/cart.type';

type CartContextType = {
  numOfCartItems: number | null;
  setNumOfCartItems: Dispatch<SetStateAction<number | null>>;

  handleCart: () => Promise<any>;

  allProducts: CartProductType[];
  setAllProducts: Dispatch<SetStateAction<CartProductType[]>>;

  totalPrice: number;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: CartProviderProps) {
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  async function handleCart(): Promise<any> {
    try {
      const data = await getProductsFromCart();
      if (!data || data.status === 'error' || !data?.data?.products) return;

      setAllProducts(data.data.products);

      let sum = 0;
      data.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });

      setNumOfCartItems(sum);
      setTotalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      // handle error
      return undefined;
    }
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        handleCart,
        setAllProducts,
        allProducts,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
