'use client';
import { useModalVisibility } from '@/utils/client-utils';
import EditIcon from '../assets/icons/EditIcon.svg';
import Image from 'next/image';
import { EventModal } from './events/EventModal';
import { EventData, NoteData } from '@/types/types';
import { NoteModal } from './notes/NoteModal';

interface EditItemButtonProps {
  itemType: 'event' | 'note';
  data: EventData | NoteData | undefined;
}

// it return icon which will open edit event/note modal
export const EditItemButton = ({ itemType, data }: EditItemButtonProps) => {
  const { isModalOpen, openModal, closeModal } = useModalVisibility();

  return (
    <>
      <div
        className="cursor-pointer transition-transform hover:scale-105 flex underline mt-0.5"
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
      >
        <div>Edit</div>
        <Image className={'ml-1 h-6 w-6 '} src={EditIcon} alt="Edit icon" />
      </div>
      {displayEditModal(itemType, isModalOpen, closeModal, data)}
    </>
  );
};

const displayEditModal = (
  modalType: 'event' | 'note',
  isModalOpen: boolean,
  closeModal: Function,
  data: EventData | NoteData | undefined,
): JSX.Element => {
  switch (modalType) {
    case 'event':
      return isModalOpen ? (
        <EventModal
          modalOpen={isModalOpen}
          closeModal={closeModal}
          mode="edit"
          eventData={data as EventData}
        />
      ) : (
        <></>
      );
    case 'note':
      return isModalOpen ? (
        <NoteModal
          modalOpen={isModalOpen}
          closeModal={closeModal}
          mode="edit"
          noteData={data as NoteData}
        />
      ) : (
        <></>
      );
    default:
      return <></>;
  }
};
