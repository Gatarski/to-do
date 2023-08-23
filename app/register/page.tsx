import { AuthForm } from '@/components/AuthForm';
import { Card } from '@/components/UI/Card';
import { getIsUserLoggedIn } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const cookie = cookies();
  const isUserLoggedIn = await getIsUserLoggedIn(cookie);
  if (isUserLoggedIn) {
    redirect('/home');
  }

  return (
    <Card className="w-1/3">
      <AuthForm authMode={'register'} />
    </Card>
  );
}
