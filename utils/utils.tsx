import { EventModal } from '@/components/EventModal';
import { AddTaskModal } from '@/components/AddTaskModal';
import { useEffect, useState } from 'react';
import { ItemType } from './common';
import { message } from 'antd';

export const useModalVisibility = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export const displayModal = (
  modalType: ItemType,
  isModalOpen: boolean,
  closeModal: Function,
  eventId?: number,
): JSX.Element => {
  switch (modalType) {
    case 'event':
      return isModalOpen ? (
        <EventModal modalOpen={isModalOpen} closeModal={closeModal} mode="add" />
      ) : (
        <></>
      );
    case 'task':
      return isModalOpen ? (
        <AddTaskModal modalOpen={isModalOpen} closeModal={closeModal} eventId={eventId} />
      ) : (
        <></>
      );
    default:
      return <></>;
  }
};

export const useValidationMessage = (
  messageToShow: string,
  type: 'error' | 'success',
  setApiError: Function,
) => {
  useEffect(() => {
    if (messageToShow) {
      message.open({
        type,
        content: messageToShow,
      });
    }
    setApiError('');
  }, [messageToShow, setApiError, type]);
};
