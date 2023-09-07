'use client';
import { useModalVisibility } from '@/utils/clientUtils';
import EditIcon from '../assets/icons/EditIcon.svg';
import Image from 'next/image';
import { EventModal } from './EventModal';
import { EventData } from '@/utils/common';

interface EditEventButtonProps {
  eventData: EventData | undefined;
  text?: string;
}

// it return icon which will open edit event modal
export const EditEventButton = ({ eventData, text }: EditEventButtonProps) => {
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
        <div>{text}</div>
        <Image className={'ml-1 h-6 w-6 '} src={EditIcon} alt="Edit icon" />
      </div>
      {isModalOpen && (
        <EventModal
          modalOpen={isModalOpen}
          closeModal={closeModal}
          mode="edit"
          eventData={eventData}
        />
      )}
    </>
  );
};
