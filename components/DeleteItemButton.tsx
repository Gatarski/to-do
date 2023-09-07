'use client';
import { useModalVisibility } from '@/utils/clientUtils';
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
        className="cursor-pointer transition-transform hover:scale-105 flex underline"
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
      >
        <div className="pt-0.5">{text}</div>
        <Image className="h-6 w-6 " src={TrashIcon} alt="Trash icon" />
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
