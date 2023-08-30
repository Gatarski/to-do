'use client';

import { Modal } from 'antd';

interface AddEventModalProps {
    modalOpen: boolean;

}

export const AddEventModal = ({ modalOpen }: AddEventModalProps) => {
  return (
    <Modal open={modalOpen}>
      <div>modal yuo</div>
    </Modal>
  );
};
