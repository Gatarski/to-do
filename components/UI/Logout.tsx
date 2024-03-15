'use client';
import { logoutUserAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import LogoutIcon from '../../assets/icons/logoutIcon.png';
import Image from 'next/image';

export const Logout = () => {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        const isLogout = await logoutUser();
          if (isLogout) {
            router.refresh();
          }
      }}
    >
      <Image src={LogoutIcon} alt="Logout icon" className="cursor-pointer" />
    </div>
  );
};

// this POST endpoint from logout and if success then set isLogout true to redirect to /login
const logoutUser = async () => {
  const apiResponse = await logoutUserAPI();
  return apiResponse.status === 200;
};
