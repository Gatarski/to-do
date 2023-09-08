'use client';
import { logoutUserAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutIcon from '../../assets/icons/logoutIcon.png';
import Image from 'next/image';

export const Logout = () => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);

  if (isLogout) {
    router.replace('/login');
  }

  return (
    <div
      onClick={async () => {
        await logoutUser(setIsLogout);
      }}
    >
      <Image src={LogoutIcon} alt="Logout icon" className="cursor-pointer" />
    </div>
  );
};

// this POST endpoint from logout and if success then set isLogout true to redirect to /login
const logoutUser = async (setIsLogout: Function) => {
  const apiResponse = await logoutUserAPI();
  setIsLogout(apiResponse.status === 200);
};
