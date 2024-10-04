import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  const verifyToken =
    token &&
    (await verifyAuth(token).catch((e: Error) => {
      console.log(e);
    }));

  if (!verifyToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-rol', verifyToken.rol);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg|login).*)',
  ],
};
