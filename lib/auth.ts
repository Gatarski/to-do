import Users, { UserDatabaseInterface } from '@/models/users';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { SignJWT, jwtVerify } from 'jose';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// this is used to hash password which will be saved on db
export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

// this is used to compare string-password and hashed password
export const checkPasswords = (password: string, hashPassword: string): Promise<boolean> =>
  bcrypt.compare(password, hashPassword);

// this create JWT with user id, email - JWT is signed by global env JWT_SECRET - it return JWT string
const createJWT = (user: UserDatabaseInterface): Promise<string> => {
  const { id, email } = user;
  const iat = Math.floor(Date.now() / 1000);
  const oneWeekExpire = iat + 60 * 60 * 24 * 7;
  return new SignJWT({ payload: { id, email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(oneWeekExpire)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

// this encode JWT string using global env JWT_SECRET - it returns its payload (eg.: user id, email)
export const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));

  return payload.payload as any;
};

// this create cookie JWT with user id, email  - its used on login/register
export const createCookieForResponse = async (
  user: UserDatabaseInterface,
): Promise<{ 'Set-Cookie': string }> => {
  const jwt = await createJWT(user);
  return {
    'Set-Cookie': serialize(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }),
  };
};

// this take JWT from cookie value and encode it to get user id - it return user from db by id from cookie (current logged user)
export const getUserFromCookie = async (cookie: ReadonlyRequestCookies) => {
  const jwt = cookie.get(process.env.COOKIE_NAME as string);

  const { id } = jwt && (await verifyJWT(jwt.value));

  const user = await Users.findOne({
    where: {
      id: id,
    },
  });
  return user;
};
// this encode JWT from cookie - if pass we know that user is logged in
export const getIsUserLoggedIn = async (cookie: ReadonlyRequestCookies): Promise<boolean> => {
  const jwtFromCookie = cookie.get(process.env.COOKIE_NAME as string)?.value as string;
  return (await jwtFromCookie)
    ? !!jwtVerify(jwtFromCookie, new TextEncoder().encode(process.env.JWT_SECRET))
    : false;
};
