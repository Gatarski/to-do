'use client';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ICON_SIZE } from '@/util/common';
import { displayModal, useModalVisibility } from '@/util/utils';

interface AddNewItemCardProps {
  buttonText: string;
  modal: 'event' | 'task';
}

// AddNewItemCard return clickable card which will open modal
export const AddNewItemCard = ({ buttonText, modal }: AddNewItemCardProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div onClick={openModal}>
        <Card
          className={
            'm-5 w-48 h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center items-center border border-dashed border-[#1677ff] hover:bg-gray-200'
          }
        >
          <>
            <PlusCircleTwoTone style={{ fontSize: ICON_SIZE }} />
            <label>{buttonText}</label>
          </>
        </Card>
      </div>
      {displayModal('event', isModalOpen, closeModal)}
    </>
  );
};
