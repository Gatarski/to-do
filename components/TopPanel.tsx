import { getUserFromCookie } from "@/lib/auth"
import { AuthFormData } from "@/types/common";
import { cookies } from 'next/headers';

export default async function TopPanel() {
  // const cookie = cookies(); 
  // const user = await getUserFromCookie(cookie);
  // const { email, name } = user?.dataValues as AuthFormData;

  const { email, name } = {email: 'email', name: 'name'}
  // HERE odblokować powyższy kod i wywailć ten zakomentowany
  const userNameToDisplay = name ? name : email
  return <div className="rounded-tr-2xl border border-gray h-20 bg-white" ><div>Hi, {userNameToDisplay}</div></div>
}

