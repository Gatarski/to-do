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
