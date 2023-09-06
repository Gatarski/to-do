'use client';
import { logoutUserAPI } from '@/lib/apiClient';
import { PoweroffOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Logout = () => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);

  if (isLogout) {
    router.replace('/login');
  }

  return (
    <PoweroffOutlined
      style={{ fontSize: '30px' }}
      onClick={async () => {
        await logoutUser(setIsLogout);
      }}
    />
  );
};

// this POST endpoint from logout and if success then set isLogout true to redirect to /login
const logoutUser = async (setIsLogout: Function) => {
  const apiResponse = await logoutUserAPI();
  setIsLogout(apiResponse.status === 200);
};
