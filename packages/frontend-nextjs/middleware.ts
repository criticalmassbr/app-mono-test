// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('auth_token')?.value;

  if (authToken) {
    // Clone the request and add the auth_token to the headers
    const headers = new Headers(req.headers);
    headers.set('Authorization', `Bearer ${authToken}`);

    // Recreate the request with the updated headers
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

  return NextResponse.redirect("/login");
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'], // Adjust the paths as needed
};