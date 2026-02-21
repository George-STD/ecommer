"use client";
import React, { useContext, useState } from "react";
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
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout() {
        await signOut();
        router.push("/login");
    }

    return (
        <>
            <nav className="sticky top-0 z-30 bg-slate-400 shadow-lg py-4 dark:bg-gray-800/80 dark:text-white transition-all duration-300">
                <div className="container">
                    {/* Mobile Navbar Header */}
                    <div className="flex w-full items-center justify-between lg:hidden mb-2 ">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image src={logo} alt="Logo" className="w-32 h-auto" />
                        </Link>
                        {data && <div className="mt-2 text-center">Hello, <span className="font-bold text-lg">{data?.user?.name}</span></div>}
                        {/* Hamburger Menu Button */}
                        <button
                            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-xl bg-slate-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors duration-300 focus:outline-none ${menuOpen ? 'ring-2 ring-accent' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Open menu"
                            style={{ transition: 'transform 0.3s' }}
                        >
                            <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>

                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="4" width="24" height="2" rx="1" fill={menuOpen ? 'black' : 'currentColor'} />
                                    <rect y="11" width="24" height="2" rx="1" fill={menuOpen ? 'gray' : 'currentColor'} />
                                    <rect y="18" width="24" height="2" rx="1" fill={menuOpen ? 'white' : 'currentColor'} />
                                </svg>
                            </span>
                        </button>
                    </div>
                    {/* Overlay Menu for Mobile */}
                    <div className={`fixed inset-0 bg-black/40 bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} lg:hidden`} onClick={() => setMenuOpen(false)}></div>
                    <div className={`fixed top-0 left-0 bottom-0 flex justify-between w-3/4 sm:max-w-1/2 md:max-w-1/3 h-full bg-white/95 dark:bg-gray-800 z-100 shadow-lg transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden flex flex-col p-6 gap-4`}>
                        <ul className="flex flex-col gap-4 p-2">
                            {/* Logo inside menu for extra access */}
                            <li className="flex justify-center">
                                <Link href="/" onClick={() => setMenuOpen(false)}><Image src={logo} alt="Logo" /></Link>
                            </li>
                            <li className="relative pt-1">
                                <Link
                                    href="/"
                                    onClick={() => setMenuOpen(false)}
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname === "/"
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-house me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname === "/" ? "text-white" : "text-gray-500"}`}></i>
                                    Home
                                </Link>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/products"
                                    onClick={() => setMenuOpen(false)}
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/products")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-box me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/products") ? "text-white" : "text-gray-500"}`}></i>
                                    Products
                                </Link>
                            </li>
                            <li className="relative">
                                <CategoriesNavLink
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/categories")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                />
                            </li>
                            <li className="relative">
                                <Link
                                    href="/brands"
                                    onClick={() => setMenuOpen(false)}
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/brands")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-star me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/brands") ? "text-white" : "text-gray-500"}`}></i>
                                    Brands
                                </Link>
                            </li>
                            {data && (
                                <li className="relative">
                                    <Link
                                        href="/allorders"
                                        onClick={() => setMenuOpen(false)}
                                        className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                            ${pathname.startsWith("/allorders")
                                                ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                                : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                        `}
                                    >
                                        <i className={`fa-solid fa-list me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/allorders") ? "text-white" : "text-gray-500"}`}></i>
                                        Orders
                                    </Link>
                                </li>
                            )}
                            <ul className="flex justify-center py-2 pt-5 gap-3 text-2xl lg:py-0 lg:text-lg">
                                <li><i className="fa-brands fa-facebook"></i></li>
                                <li><i className="fa-brands fa-instagram"></i></li>
                                <li><i className="fa-brands fa-twitter"></i></li>
                                <li><i className="fa-brands fa-linkedin"></i></li>
                                <li><i className="fa-brands fa-tiktok"></i></li>
                            </ul>
                        </ul>
                        <div className="mt-6">
                            {data ? (
                                <>
                                    <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full py-2 bg-primary text-white rounded-lg">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-center mb-2">Login</Link>
                                    <Link href="/register" onClick={() => setMenuOpen(false)} className="block w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-center">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="sticky top-0 lg:flex hidden z-30 bg-slate-400 backdrop-blur-md shadow-lg py-4 dark:bg-gray-800/80 dark:text-white transition-all duration-300">
                <div className="container flex flex-col lg:flex-row justify-between items-center transition-all duration-150 relative">
                    {/* Desktop Navbar */}
                    <div className="left lg:flex hidden">
                        <ul className="left flex flex-col lg:flex-row justify-center items-center gap-3 transition-all duration-150">
                            <li className="flex justify-center">
                                <Link href="/"><Image src={logo} alt="Logo" /></Link>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/"
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname === "/"
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-house me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname === "/" ? "text-white" : "text-gray-500"}`}></i>
                                    Home
                                    <span className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/products"
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/products")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-box me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/products") ? "text-white" : "text-gray-500"}`}></i>
                                    Products
                                    <span className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li className="relative">
                                <CategoriesNavLink
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/categories")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                />
                                <span className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                            </li>
                            <li className="relative">
                                <Link
                                    href="/brands"
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                        ${pathname.startsWith("/brands")
                                            ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                            : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                    `}
                                >
                                    <i className={`fa-solid fa-star me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/brands") ? "text-white" : "text-gray-500"}`}></i>
                                    Brands
                                    <span className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            {data && (
                                <li className="relative">
                                    <Link
                                        href="/allorders"
                                        className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center group
                                            ${pathname.startsWith("/allorders")
                                                ? "bg-linear-to-r from-primary to-accent text-white shadow-lg scale-105"
                                                : "text-gray-700 hover:bg-gray-100 hover:scale-110 dark:text-gray-200 dark:hover:bg-gray-700"}
                                        `}
                                    >
                                        <i className={`fa-solid fa-list me-2 text-lg transition-all duration-300 group-hover:text-accent ${pathname.startsWith("/allorders") ? "text-white" : "text-gray-500"}`}></i>
                                        Orders
                                        <span className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* Desktop Right Side */}
                    <div className="right lg:flex hidden">
                        <ul className="flex flex-col lg:flex-row items-center gap-3 transition-all duration-150">
                            <ul className="flex justify-center py-2 gap-3 text-2xl lg:py-0 lg:text-lg">
                                <li><i className="fa-brands fa-facebook"></i></li>
                                <li><i className="fa-brands fa-instagram"></i></li>
                                <li><i className="fa-brands fa-twitter"></i></li>
                                <li><i className="fa-brands fa-linkedin"></i></li>
                                <li><i className="fa-brands fa-tiktok"></i></li>
                            </ul>
                            {data && (
                                <li className="relative">
                                    <Link href="/cart">
                                        <ShoppingCart />
                                            {(typeof context?.numOfCartItems === "number" && (context?.numOfCartItems ?? 0) > 0) && (
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
            <div className="cart fixed bottom-4 end-6 w-14 h-14 z-20 border-2 border-solid border-black/50 rounded-full p-3 bg-white flex justify-center items-center lg:hidden ">
                <div className="">
                    {data && (
                        <li className="relative group flex justify-center">
                            <Link href="/cart" className="flex items-center">
                                <span className={`relative transition-transform duration-300 group-hover:scale-110 ${(context?.numOfCartItems ?? 0) > 0 ? "text-black/90" : "text-gray-500"}`}> 
                                    <ShoppingCart className="w-7 h-7" />
                                    {(typeof context?.numOfCartItems === "number" && context?.numOfCartItems > 0) && (
                                        <span className="absolute -top-5 -end-5 bg-linear-to-r from-primary to-accent text-white rounded-full w-6 h-6 text-xs flex justify-center items-center font-bold shadow-lg border-2 border-white animate-bounce">
                                            {context?.numOfCartItems}
                                        </span>
                                    )}
                                </span>
                                <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">سلة المشتريات</span>
                            </Link>
                        </li>
                    )}
                </div>
            </div>
        </>
    );
}

