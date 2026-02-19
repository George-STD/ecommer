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
                        <ul className="flex items-center gap-3">
                            <li>
                                <Link href="/"><Image src={logo} alt="Logo" /></Link>
                            </li>
                            <li>
                                <Link href="/" className={pathname === "/" ? "text-blue-600 font-bold underline" : ""}>Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className={pathname.startsWith("/products") ? "text-blue-600 font-bold underline" : ""}>Products</Link>
                            </li>
                            <li>
                                <CategoriesNavLink className={pathname.startsWith("/categories") ? "text-blue-600 font-bold underline" : ""} />
                            </li>
                            <li>
                                <Link href="/brands" className={pathname.startsWith("/brands") ? "text-blue-600 font-bold underline" : ""}>Brands</Link>
                            </li>
                            {data && (
                                <li><Link href="/allorders">Orders</Link></li>
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
                                    <li><Link href="/login">Login</Link></li>
                                    <li><Link href="/register">Register</Link></li>
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

