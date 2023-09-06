'use client';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ItemType } from '@/utils/common';
import { displayModal } from '@/utils/utils';
import { useModalVisibility } from '@/utils/utils';
import { useCallback } from 'react';

interface AddNewItemCardProps {
  buttonText: string;
  itemType: ItemType;
  eventId?: number;
  isDisabled?: boolean;
}

// it return clickable card which will open modal
export const AddNewItemCard = ({
  buttonText,
  itemType,
  eventId,
  isDisabled = false,
}: AddNewItemCardProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  const disabledCardStyle = 'bg-slate-100 transition-none hover:scale-100 cursor-not-allowed';
  const cardStyle = `${
    itemType === 'task' ? 'w-64 h-32' : 'w-48 h-48'
  } m-4 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center items-center border border-dashed border-[#1677ff] hover:bg-gray-200 ${
    isDisabled && disabledCardStyle
  }`;

  const onClick = useOnClick(isDisabled, openModal);
  return (
    <>
      <div onClick={onClick}>
        <Card className={cardStyle}>
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

const useOnClick = (isDisabled: boolean | undefined, openModal: Function) => {
  return useCallback(() => {
    if (!isDisabled) {
      openModal();
    }
  }, [isDisabled]);
};
