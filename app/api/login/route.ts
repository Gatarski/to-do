import { checkPasswords, createCookieForResponse } from '@/lib/auth';
import Users from '@/models/users';
import { NextRequest, NextResponse } from 'next/server';

const INVALID_EMAIL_USER_MSG = 'Invalid email or password';

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  const { email, password } = data;

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: INVALID_EMAIL_USER_MSG }, { status: 401 });
  }

  const isPasswordCorrect = await checkPasswords(password, user.password);

  if (isPasswordCorrect) {
    const cookie = await createCookieForResponse(user);
    return new NextResponse(null, { status: 200, headers: cookie });
  } else {
    return NextResponse.json({ error: INVALID_EMAIL_USER_MSG }, { status: 401 });
  }
};
