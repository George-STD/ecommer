import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // حماية صفحات cart و allorders
    if (!token && (pathname === '/cart' || pathname === '/allorders')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // منع دخول صفحات login/register للمسجلين
    if (token && (pathname === '/login' || pathname === '/(auth)/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/cart', '/allorders', '/login', '/(auth)/register']
}