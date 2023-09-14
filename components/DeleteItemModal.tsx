'use client';
import { ItemType, ModalMessages } from '@/types/types';
import { useRouter } from 'next/navigation';
import Button from './UI/Button';
import { deleteNoteAPI, deleteProjectAPI, deleteTaskAPI } from '@/lib/apiClient';
import { useCallback } from 'react';
import { Modal } from './Modal';

interface DeleteItemModalProps {
  modalOpen: boolean;
  closeModal: Function;
  itemType: ItemType;
  id: string | number | undefined;
}

export const DeleteItemModal = ({ modalOpen, closeModal, itemType, id }: DeleteItemModalProps) => {
  const { title, subtitle } = getModalMessages(itemType);

  return (
    <Modal
      open={modalOpen}
      footer={<ModalFooter closeModal={closeModal} itemType={itemType} id={id} />}
    >
      <div className="flex flex-col pl-5 pb-5 gap-2 border-b border-solid">
        <header className="text-base font-semibold">{title}</header>
        <p className="text-sx font-normal">{subtitle}</p>
      </div>
    </Modal>
  );
};

interface ModalFooterProps {
  closeModal: Function;
  itemType: ItemType;
  id: string | number | undefined;
}

const ModalFooter = ({ closeModal, itemType, id }: ModalFooterProps): JSX.Element => {
  const redirectAction = useRedirectAction(itemType);

  return (
    <>
      <Button
        buttonText="Cancel"
        isDisabled={false}
        onClick={() => {
          closeModal();
        }}
      />
      <Button
        className="mr-2"
        buttonText="Delete"
        isDisabled={false}
        type="primary"
        onClick={async () => {
          await deleteAction(itemType, id);
          redirectAction();
        }}
      />
    </>
  );
};

const getModalMessages = (itemType: ItemType): ModalMessages => {
  switch (itemType) {
    case 'task':
      return { title: 'Delete task', subtitle: 'Are you sure you want delete task?' };
    case 'event':
      return {
        title: 'Delete event',
        subtitle:
          'Are you sure you want delete event? All tasks inside this event will be deleted.',
      };
    case 'note':
      return { title: 'Delete note', subtitle: 'Are you sure you want delete note?' };
    default:
      return { title: 'Delete item', subtitle: 'Are you sure you want delete item?' };
  }
};

const deleteAction = async (itemType: ItemType, id: string | number | undefined) => {
  switch (itemType) {
    case 'event':
      return await deleteProjectAPI(id);
    case 'task':
      return await deleteTaskAPI(id);
    case 'note':
      return await deleteNoteAPI(id);
  }
};

const useRedirectAction = (itemType: ItemType) => {
  const router = useRouter();

  return useCallback(() => {
    switch (itemType) {
      case 'event':
        router.replace('/home');
        router.refresh();
        return;
      case 'task':
        router.refresh();
        return;
      case 'note':
        router.replace('/notes');
        router.refresh();
        return;
      default:
        router.refresh();
        return;
    }
  }, [itemType, router]);
};
