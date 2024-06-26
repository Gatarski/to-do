import { AuthForm } from '@/components/AuthForm';
import { Card } from '@/components/UI/Card';
import { getIsUserLoggedIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const isUserLoggedIn = await getIsUserLoggedIn();
  if (isUserLoggedIn) {
    redirect('/home');
  }

  return (
    <Card className="w-1/2 flex items-center justify-center mobile:w-full">
      <AuthForm authMode={'login'} />
    </Card>
  );
}
