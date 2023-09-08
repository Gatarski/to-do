import { getUserIdFromCookie } from '@/lib/auth';
import Users from '@/models/users';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (request: NextRequest) => {
  const profileData = await request.json();
  const id = await getUserIdFromCookie();

  await Users.update(profileData, {
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: 'Profile updated', status: 200 }, { status: 200 });
};

// this action will hard delete currently logged user
export const DELETE = async (request: NextRequest) => {
  const userId = await getUserIdFromCookie();

  const userFromDB = await Users.findOne({
    where: {
      id: userId,
    },
  });

  if (userId && userFromDB) {
    // this is for deleting session
    request.nextUrl.pathname = '/';
    const response = NextResponse.json({ status: 200 });
    response.cookies.delete(process.env.COOKIE_NAME as string);

    userFromDB.destroy();
    return response;
  }
};
