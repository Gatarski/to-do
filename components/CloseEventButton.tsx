'use client';
import { closeProjectAPI } from '@/lib/apiClient';
import Button from './UI/Button';
import { useRouter } from 'next/navigation';

interface CloseEventButtonProps {
  id: string | number | undefined;
  isClosed: boolean;
}

export const CloseEventButton = ({ id, isClosed }: CloseEventButtonProps) => {
  const buttonText = isClosed ? 'Reopen' : 'Close';
  const router = useRouter();
  return (
    <>
      <Button
        buttonText={buttonText}
        isDisabled={false}
        onClick={async () => {
          const response = await closeProjectAPI(id as string);

          if (response.status === 200) {
            router.refresh();
          }
        }}
      />
    </>
  );
};
