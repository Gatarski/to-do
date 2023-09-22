'use client';
import { Checkbox } from 'antd';
import Button from '../UI/Button';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/navigation';
import { deleteUserAPI } from '@/lib/apiClient';
import { Modal } from '../Modal';

interface DeleteUserModalProps {
  modalOpen: boolean;
  closeModal: Function;
}

export const DeleteUserModal = ({ modalOpen, closeModal }: DeleteUserModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <>
      {modalOpen && (
        <Modal
          open={modalOpen}
          footer={
            <ModalFooter
              closeModal={closeModal}
              setIsConfirmed={setIsConfirmed}
              isConfirmed={isConfirmed}
            />
          }
        >
          <div className="flex flex-col gap-2 border-b border-solid">
            <div className='border-b border-solid"'>
              <header className="px-5 pb-5 text-base font-semibold">Delete user</header>
            </div>
            <p className="pl-5 pt-2 text-sx font-normal">
              Are you sure you want to delete user? You will lose all your data.
            </p>
            <div className="flex px-5 pt-2 pb-4 gap-2 font-bold">
              <Checkbox
                onChange={(event: CheckboxChangeEvent) => {
                  setIsConfirmed(event.target.checked);
                }}
              />
              <p>Yes I confirm that I want to delete this user with all its data</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

interface ModalFooterProps {
  closeModal: Function;
  isConfirmed: boolean;
  setIsConfirmed: Function;
}

const ModalFooter = ({
  closeModal,
  isConfirmed,
  setIsConfirmed,
}: ModalFooterProps): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Button
        buttonText="Cancel"
        onClick={() => {
          setIsConfirmed(false);
          closeModal();
        }}
      />
      <Button
        className={'mr-2'}
        buttonText="Delete"
        isDisabled={!isConfirmed}
        type="primary"
        onClick={async () => {
          const response = await deleteUserAPI();
          if (response.status === 200) {
            router.refresh();
            router.replace('/');
          }
        }}
      />
    </>
  );
};
