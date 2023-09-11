'use client';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ItemType } from '@/utils/common';
import { displayAddModal } from '@/utils/utils';
import { useModalVisibility } from '@/utils/client-utils';
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
  const cardStyle = getStyleForAddItemCard(isDisabled, itemType);

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
      {displayAddModal(itemType, isModalOpen, closeModal, eventId)}
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

const getStyleForAddItemCard = (isDisabled: boolean | undefined, itemType: ItemType): string => {
  const commonStyle = `${
    itemType === 'event' ? 'w-48 h-48' : 'w-64 h-32'
  } m-4 flex flex-col justify-center items-center border border-dashed border-[#1677ff]`;

  switch (isDisabled) {
    case true:
      return `${commonStyle} cursor-not-allowed px-2 py-0 bg-slate-100`;
    case false:
      return `${commonStyle} cursor-pointer transition-transform hover:scale-105 px-2 py-0 hover:bg-gray-200`;
    default:
      return commonStyle;
  }
};
