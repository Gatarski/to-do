'use client';

import { Modal } from 'antd';
import Button from './UI/Button';

interface AddEventModalProps {
    modalOpen: boolean;
    closeModal: Function;
}

export const AddEventModal = ({ modalOpen, closeModal }: AddEventModalProps) => {
  return (
    <Modal closable={false} open={modalOpen} footer={<ModalFooter closeModal={closeModal} />}>
      <div>modal yuo</div>
    </Modal>
  );
};

const ModalFooter = ({ closeModal }: any) => {
    return (
      <div>
        <Button buttonText="Cancel" isDisabled={false} onClick={closeModal}/>
        <Button buttonText="Save" isDisabled={false} type="primary" />
      </div>
    );
}