// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('auth_token')?.value;

  if (authToken) {
    const headers = new Headers(req.headers);
    headers.set('Authorization', `Bearer ${authToken}`);

    const modifiedRequest = new Request(req.url, {
      headers,
      method: req.method,
      body: req.body,
      redirect: req.redirect,
    });

    return NextResponse.next({
      request: modifiedRequest,
    });
  }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_LOGIN ?? "");
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'], // Adjust the paths as needed
};