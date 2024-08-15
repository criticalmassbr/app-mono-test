import { NextResponse } from 'next/server';
import * as jose from 'jose'
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const publicRoutes = ['/login', '/register'];
const protectedRoutes = ['/posts', '/user'];
const secretKey = process.env.JWT_SECRET_KEY || 'dialog';

const jwtConfig = {
    secret: new TextEncoder().encode(secretKey),
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuth = await isAuthenticated(request);

    if (publicRoutes.includes(pathname)) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/posts', request.url));
        }
    }

    if (protectedRoutes.includes(pathname)) {
        if (!isAuth) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

const isAuthenticated = async (req: NextRequest) => {
    let token = cookies().get("auth_token")?.value;
    if (token != undefined) {
        try {
            const decoded = await jose.jwtVerify(token, jwtConfig.secret)
            if (decoded.payload?.userId) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.error('isAuthenticated error: ', err)
            return false
        }
    } else {
        return false
    }
}

export const config = {
    matcher: ['/posts/:path*', '/user/:path*', '/login', '/register'],
};
