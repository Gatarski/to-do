import { hashPassword, setCookieInResponse } from '@/lib/auth';
import Users from '@/models/users';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const contactOwnerMessage =
    'To much users in database - if you want user contact Grzegorz Gątarski';
  const invalidEmailPasswordMessage = 'Invalid email or password';

  if (req.method === 'POST') {
    const userData = req.body;
    userData.email = userData.email.toLocaleLowerCase();
    userData.password = await hashPassword(userData.password);
    const existingUsers = await Users.findAll();

    const canRegisterNewUser = existingUsers.length < 10;
    const isEmailTaken = existingUsers.some(
      user => user.email.toLocaleLowerCase() === req.body.email.toLocaleLowerCase(),
    );

    if (isEmailTaken) {
      res.status(400);
      res.json({ error: invalidEmailPasswordMessage });
      res.end();
    } else {
      if (canRegisterNewUser) {
        const user = await Users.create(userData);
        await setCookieInResponse(user, res);
        res.status(201);
        res.end();
      } else {
        res.status(400);
        res.json({ error: contactOwnerMessage });
      }
    }
    res.end();
  } else {
    res.end();
  }
}
