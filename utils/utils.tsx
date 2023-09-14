import { EventModal } from '@/components/events/EventModal';
import { AddTaskModal } from '@/components/tasks/AddTaskModal';
import { NoteModal } from '@/components/notes/NoteModal';
import { ItemType } from '@/types/types';

export const displayAddModal = (
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

export const getCurrentDate = () => new Date().toJSON().slice(0, 10);
