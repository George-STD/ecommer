import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './_components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { Toaster } from '@/components/ui/sonner';
import CartProvider from '../context/cart.context'
import MyProvider from '@/MyProvider/MyProvider';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fresh Cart',
  description: 'E-Commerce App For Shopping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>

        <ThemeProvider defaultTheme='light' attribute={'class'}>
          <MyProvider>
            <CartProvider>
              <Toaster richColors theme='light' closeButton />
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </MyProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
