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
  requestHeaders.set('x-user-id', verifyToken.id);
  requestHeaders.set('x-user-rol', verifyToken.rol);

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (verifyToken.rol !== 'ADMIN' && verifyToken.rol !== 'MODERADOR') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  if (request.nextUrl.pathname === '/dashboard/users') {
    if (verifyToken.rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg|login|register).*)',
  ],
};
