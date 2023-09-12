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
    <Card className="w-[600px]">
      <AuthForm authMode={'register'} />
    </Card>
  );
}
