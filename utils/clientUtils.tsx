import { message } from 'antd';
import { useEffect, useState } from 'react';

/*
function here are used only in client-component - if in this file will be function to use in
server-component it will not work because this file import hooks. Function to use for both
server and client-components are used in utils/utils.tsx
*/

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
