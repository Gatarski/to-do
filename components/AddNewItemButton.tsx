'use client';
import Button from './UI/Button';
import { displayModal, useModalVisibility } from '@/util/utils';

interface AddNewItemButtonProps {
  buttonText: string;
  modal: 'event' | 'task';
}

// AddNewItemButton return button which will open modal
export const AddNewItemButton = ({ buttonText, modal }: AddNewItemButtonProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div onClick={openModal}>
        <Button className="w-full h-10" isDisabled={false} buttonText={buttonText} />
      </div>
      {displayModal(modal, isModalOpen, closeModal)}
    </>
  );
};
