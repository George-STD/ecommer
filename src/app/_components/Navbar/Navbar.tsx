"use client";
import React, { useContext } from "react";
import logo from "../../../../public/images/freshcart-logo.svg";
import Image from "next/image";
import Link from "next/link";
import CategoriesNavLink from './CategoriesNavLink';
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import { CartContext } from "@/context/cart.context";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const { data } = useSession();
    const context = useContext(CartContext);
    const pathname = usePathname();

    async function handleLogout() {
        await signOut();
        router.push("/login");
    }

    return (
        <>
            <nav className="bg-slate-300 py-6 dark:bg-gray-600 dark:text-white">
                <div className="container flex justify-between items-center">
                    <div className="left">
                        <ul className="left flex items-center gap-3">
                            <li>
                                <Link href="/"><Image src={logo} alt="Logo" /></Link>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/"
                                    className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                        ${pathname === "/"
                                            ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                            : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/products"
                                    className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                        ${pathname.startsWith("/products")
                                            ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                            : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    Products
                                </Link>
                            </li>
                            <li className="relative">
                                <CategoriesNavLink
                                    className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                        ${pathname.startsWith("/categories")
                                            ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                            : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                />
                            </li>
                            <li className="relative">
                                <Link
                                    href="/brands"
                                    className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                        ${pathname.startsWith("/brands")
                                            ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                            : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    Brands
                                </Link>
                            </li>
                            {data && (
                                <li className="relative">
                                    <Link
                                        href="/allorders"
                                        className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                            ${pathname.startsWith("/allorders")
                                                ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                                : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                        `}
                                    >
                                        Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="right">
                        <ul className="flex items-center gap-3">
                            <li><i className="fa-brands fa-facebook"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                            <li><i className="fa-brands fa-twitter"></i></li>
                            <li><i className="fa-brands fa-linkedin"></i></li>
                            <li><i className="fa-brands fa-tiktok"></i></li>
                            {data && (
                                <li className="relative">
                                    <Link href="/cart">
                                        <ShoppingCart />
                                        {(typeof context?.numOfCartItems === "number" && context?.numOfCartItems > 0) && (
                                            <h5 className="bg-black text-white rounded-full w-5 h-5 text-sm flex justify-center items-center absolute -top-3.5 -end-3">
                                                {context?.numOfCartItems}
                                            </h5>
                                        )}
                                    </Link>
                                </li>
                            )}
                            {data ? (
                                <>
                                    <li onClick={handleLogout} className="cursor-pointer">
                                        Logout
                                    </li>
                                    <li>hi, <span className="font-semibold italic">{data.user?.name}</span></li>
                                </>
                            ) : (
                                <>
                                    <li className="relative">
                                        <Link href="/login" className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                            ${pathname.startsWith("/login")
                                                ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                                : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                        `}>Login</Link></li>
                                    <li className="relative">
                                        <Link href="/register" className={`relative px-3 py-1 rounded-lg transition-all duration-200 flex items-center
                                            ${pathname.startsWith("/register")
                                                ? "bg-primary text-white shadow-md font-bold after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-accent after:rounded-full dark:text-black"
                                                : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
                                        `}>Register</Link></li>
                                </>
                            )}
                            <li className="block dark:hidden"><Moon onClick={() => { setTheme('dark') }} /></li>
                            <li className="hidden dark:block"><Sun onClick={() => { setTheme('light') }} /></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

