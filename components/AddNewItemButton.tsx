'use client';
import { displayModal } from '@/utils/utils';
import Button from './UI/Button';
import { useModalVisibility } from '@/utils/clientUtils';
import { ItemType } from '@/utils/common';

interface AddNewItemButtonProps {
  buttonText: string;
  itemType: ItemType;
  isDisabled?: boolean;
  eventId?: number;
}

// it return button which will open modal
export const AddNewItemButton = ({ buttonText, itemType, eventId, isDisabled = false }: AddNewItemButtonProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div className={'w-full mb-5'} onClick={openModal}>
        <Button className="w-full h-10" isDisabled={isDisabled} buttonText={buttonText} />
      </div>
      {displayModal(itemType, isModalOpen, closeModal, eventId)}
    </>
  );
};
