import { NextRequest, NextResponse } from 'next/server';

// this for user logout - it destroy cookie token
export const POST = async (request: NextRequest) => {
  request.nextUrl.pathname = '/login';
  const response = NextResponse.json({status: 200});
  response.cookies.delete(process.env.COOKIE_NAME as string)
  return response
};
