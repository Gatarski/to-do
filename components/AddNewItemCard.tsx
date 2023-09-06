'use client';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ItemType } from '@/utils/common';
import { displayModal } from '@/utils/utils';
import { useModalVisibility } from '@/utils/utils';

interface AddNewItemCardProps {
  buttonText: string;
  itemType: ItemType;
  eventId?: number;
}

// AddNewItemCard return clickable card which will open modal
export const AddNewItemCard = ({ buttonText, itemType, eventId }: AddNewItemCardProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div onClick={openModal}>
        <Card
          className={`${
            itemType === 'task' ? 'w-64 h-32' : 'w-48 h-48'
          } m-4 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center items-center border border-dashed border-[#1677ff] hover:bg-gray-200`}
        >
          <>
            <PlusCircleTwoTone style={{ fontSize: '38px' }} />
            <label>{buttonText}</label>
          </>
        </Card>
      </div>
      {displayModal(itemType, isModalOpen, closeModal, eventId)}
    </>
  );
};
