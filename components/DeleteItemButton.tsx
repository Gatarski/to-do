'use client';
import { useModalVisibility } from '@/utils/utils';
import { ItemType } from '@/utils/common';
import TrashIcon from '../assets/icons/TrashIcon.svg';
import Image from 'next/image';
import { DeleteItemModal } from './DeleteItemModal';

interface DeleteItemButtonProps {
  itemType: ItemType;
  id: string | number | undefined;
  text?: string;
}

// it return icon which will open modal with deletion confirmation - it can be used to delete event and task
export const DeleteItemButton = ({ itemType, id, text }: DeleteItemButtonProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div
        className="h-6 w-6 min-h-[32px] min-w-[32px] cursor-pointer transition-transform hover:scale-105"
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
      >
        {text}
        <Image src={TrashIcon} alt="Trash Icon" />
      </div>
      <DeleteItemModal
        modalOpen={isModalOpen}
        closeModal={closeModal}
        id={id}
        itemType={itemType}
      />
    </>
  );
};
