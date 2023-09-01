import { AddEventModal } from '@/components/AddEventModal';
import { AddTaskModal } from '@/components/AddTaskModal';
import { useState } from 'react';

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
  modal: 'event' | 'task',
  isModalOpen: boolean,
  closeModal: Function,
  eventId?: number,
): JSX.Element => {
  switch (modal) {
    case 'event':
      return <AddEventModal modalOpen={isModalOpen} closeModal={closeModal} />;
    case 'task':
      return <AddTaskModal modalOpen={isModalOpen} closeModal={closeModal} eventId={eventId} />;
    default:
      return <></>;
  }
};
