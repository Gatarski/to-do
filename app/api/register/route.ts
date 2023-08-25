import { hashPassword, createCookieForResponse } from '@/lib/auth';
import Users from '@/models/users';
import { NextResponse } from 'next/server';

const CONTACT_OWNER_MSG = 'To much users in database - if you want user contact Grzegorz Gątarski';
const INVALID_EMAIL_USER_MSG = 'Invalid email or password';

export const POST = async (request: Request) => {
  const userData = await request.json();
  userData.email = userData.email.toLocaleLowerCase();
  userData.password = await hashPassword(userData.password);
  const existingUsers = await Users.findAll();

  const canRegisterNewUser = existingUsers.length < 10;
  const isEmailTaken = existingUsers.some(
    user => user.email.toLocaleLowerCase() === userData.email.toLocaleLowerCase(),
  );

  if (isEmailTaken) {
    return NextResponse.json({ error: INVALID_EMAIL_USER_MSG }, { status: 401 });
  } else {
    if (canRegisterNewUser) {
      const user = await Users.create(userData);
      const cookie = await createCookieForResponse(user);
      return new NextResponse(null, { status: 200, headers: cookie });
    } else {
      return NextResponse.json({ error: CONTACT_OWNER_MSG }, { status: 401 });
    }
  }
};
