import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getIsUserLoggedIn } from '@/lib/auth';
import Image from 'next/image';
import ToDoListImage from '../assets/images/ToDoList.png';

export const WelcomePage = async () => {
  const isUserLoggedIn = await getIsUserLoggedIn();
  if (isUserLoggedIn) {
    redirect('/home');
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl mb-2">Welcome</h1>
        <h2 className="text-2xl mb-2 p-1">Have plans to organize?</h2>
        <p className="tex-lg text-black/25">
          Create simple well organized event with tasks to not miss anything
        </p>
        <div className="flex justify-center m-5">
          <Image className={'w-[200px] h-[200px]'} src={ToDoListImage} alt="To do list" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="m-3 p-3">
          <Link href="/login" className="text-blue-600 font-bold text-sm">
            Go to login page
          </Link>
        </div>
        <div className="m-3 p-3">
          <Link href="/register" className="text-blue-600 font-bold text-sm">
            Go to register page
          </Link>
        </div>
      </div>
    </>
  );
};
