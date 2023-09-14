import { AuthForm } from '@/components/AuthForm';
import { Card } from '@/components/UI/Card';
import { getIsUserLoggedIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const isUserLoggedIn = await getIsUserLoggedIn();
  if (isUserLoggedIn) {
    redirect('/home');
  }

  return (
    <Card className="w-[600px] portrait:w-[350px]">
      <AuthForm authMode={'register'} />
    </Card>
  );
}
