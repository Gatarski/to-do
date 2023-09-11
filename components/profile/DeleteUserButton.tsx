'use client';
import { DeleteUserModal } from './DeleteUserModal';
import { useModalVisibility } from '@/utils/client-utils';

export const DeleteUserButton = () => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div className="h-0 flex flex-col gap-1">
        <label className="font-bold">Want delete user?</label>
        <button
          onClick={openModal}
          className="py-2 px-4 rounded-full border b border-dotted border-red-500 text-red-500 hover:text-red-700 hover:border-red-700 font-semibold shadow-md"
        >
          Delete user
        </button>
      </div>
      <DeleteUserModal modalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
