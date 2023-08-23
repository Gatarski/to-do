import { checkPasswords, setCookieInResponse } from '@/lib/auth';
import Users from '@/models/users';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const notLoggedErrorMessage = 'Invalid email or password';

  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: notLoggedErrorMessage });
      return;
    }

    const isPasswordCorrect = await checkPasswords(password, user.password);

    if (isPasswordCorrect) {
      await setCookieInResponse(user, res);
      res.status(201);
      res.end();
    } else {
      res.status(401);
      res.json({ error: notLoggedErrorMessage });
    }
  } else {
    res.end();
  }
}
