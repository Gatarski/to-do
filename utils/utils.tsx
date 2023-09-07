import { EventModal } from '@/components/EventModal';
import { AddTaskModal } from '@/components/AddTaskModal';
import { ItemType } from './common';
import { NoteModal } from '@/components/NoteModal';

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
    case 'note':
      return isModalOpen ? (
        <NoteModal modalOpen={isModalOpen} closeModal={closeModal} mode="add" />
      ) : (
        <></>
      );
    default:
      return <></>;
  }
};

export const NoData = ({ message }: { message: string }): JSX.Element => {
  return <div className="text-3xl font-bold">{message}</div>;
};
