import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
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

// this set which routes will be handled by above middleware
export const config = {
  matcher: ['/home', '/profile', '/notes'],
};
