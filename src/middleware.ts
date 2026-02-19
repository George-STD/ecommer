import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl

    if (!token && pathname == '/cart' || pathname == '/orders') {
        return NextResponse.redirect(new URL('/login', request.url))
    } else if (token && pathname == '/login' || pathname == '/register') {
        return NextResponse.redirect(new URL('/', request.url))
    }else{
        return NextResponse.next()
    }

}

export const config = {
    matcher: ['/cart', '/order','/login','/register']
}