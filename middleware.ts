import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  // this is to avoid checking by middleware public files eg.: favicon.ico and pages which do not need auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname === '/' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwtFromCookie = req.cookies.get(process.env.COOKIE_NAME as string);
  if (!jwtFromCookie) {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    // if jwtVerify will not pass it means that user is not logged in
    await jwtVerify(jwtFromCookie.value, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }
}
