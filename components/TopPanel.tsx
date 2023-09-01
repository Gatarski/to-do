import { getUserFromCookie } from '@/lib/auth';
import { AuthFormData } from '@/util/common';
import { cookies } from 'next/headers';
import { Logout } from './Logout';

export default async function TopPanel() {
  const cookie = cookies();
  const user = await getUserFromCookie(cookie);
  const { email, name } = user?.dataValues as AuthFormData;

  const userNameToDisplay = name ? name : email;
  return (
    <div className="min-h-[75px] rounded-tr-2xl border border-gray h-20 bg-white flex items-center justify-between">
      <div className="pl-6 text-xl">You are logged as {userNameToDisplay}</div>
      <div className="pr-6">
        <Logout />
      </div>
    </div>
  );
}
