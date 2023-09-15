'use client';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ItemType } from '@/types/types';
import { displayAddModal } from '@/utils/utils';
import { useModalVisibility } from '@/utils/client-utils';
import { useCallback } from 'react';
import {
  EVENT_CARD_SIZE_STYLE,
  NOTE_CARD_SIZE_STYLE,
  TASK_CARD_SIZE_STYLE,
} from '@/constants/sizes';

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
  const cardStyle = getCardStyle(itemType);

  switch (isDisabled) {
    case true:
      return `${cardStyle} cursor-not-allowed px-2 py-0 bg-slate-100`;
    case false:
      return `${cardStyle} cursor-pointer transition-transform hover:scale-105 px-2 py-0 hover:bg-gray-200`;
    default:
      return cardStyle;
  }
};

const getCardStyle = (itemType: ItemType) => {
  const commonStyle =
    'm-4 flex flex-col justify-center items-center border border-dashed border-blue-600';
  switch (itemType) {
    case 'event':
      return `${EVENT_CARD_SIZE_STYLE} ${commonStyle}`;
    case 'task':
      return `${TASK_CARD_SIZE_STYLE} ${commonStyle}`;
    case 'note':
      return `${NOTE_CARD_SIZE_STYLE} ${commonStyle}`;
    default:
      return commonStyle;
  }
};
