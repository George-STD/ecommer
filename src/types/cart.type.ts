import { Dispatch, SetStateAction } from "react"

export type CartType = {
    cartId: string,
    data: CartDataType
    numOfCartItems: number,
    status: string
}

type CartDataType = {
    cartOwner: string,
    createdAt: string,
    products: CartProductType,
    totalCartPrice: number,
    updatedAt: string,
    __v: number,
    _id: string
}

export type CartProductType = {
    _id: string;
    count: number;
    price: number;
    product: CartProductDetailsType;
}

type CartProductDetailsType = {
    id: string,
    imageCover: string,
    quantity: number,
    ratingsAverage: number,
    title: string,
    _id: string
}

export type CartContextType = {
    numOfCartItems: number | null;
    setNumOfCartItems: Dispatch<SetStateAction<number | null>>;

    handleCart: () => Promise<void>;

    allProducts: CartProductType[];
    setAllProducts: Dispatch<SetStateAction<CartProductType[]>>;

    totalPrice: number;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
