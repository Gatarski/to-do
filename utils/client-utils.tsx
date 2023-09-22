import { SearchKeyType } from '@/types/types';
import { message } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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

const createNewQueryParam = (searchKeyUrl: string, searchValue?: string | string[]) => {
  if (!searchValue) {
    return '';
  }
  if (!Array.isArray(searchValue)) {
    return `${searchKeyUrl}=${searchValue}`;
  }

  return searchValue
    .map(value => {
      const isLastItem = searchValue.slice(-1)[0] === value;
      return `${searchKeyUrl}=${value}${isLastItem ? '' : '&'}`;
    })
    .join('');
};

// NOTE: check if such mechanism already exist and use if fit
export const useGetCreateQueryParamsUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (searchKeyUrl: SearchKeyType, searchValue?: string | string[]) => {
      const existingQueryParamsKeys = Array.from(searchParams.keys());
      const uniqExistingQueryParamsKeys = Array.from(new Set(existingQueryParamsKeys));
      /*
       existingQueryParams returns existing query params without new searched key
       eg.: if new search is event=vacation it will return all exisitng query params without event
      */
      const existingQueryParams = uniqExistingQueryParamsKeys
        .map(key => {
          if (key !== searchKeyUrl) {
            const searchValues = searchParams.getAll(key);
            return searchValues
              .map(value => {
                const isLastItem = searchValues.slice(-1)[0] === value;
                return `${key}=${value}${isLastItem ? '' : '&'}`;
              })
              .join('');
          }
        })
        .join('');
      const newQueryParams = createNewQueryParam(searchKeyUrl, searchValue);

      if (existingQueryParams && newQueryParams) {
        return `${pathname}?${existingQueryParams}&${newQueryParams}`;
      }

      if (existingQueryParams && !newQueryParams) {
        return `${pathname}?${existingQueryParams}`;
      }

      if (!existingQueryParams && newQueryParams) {
        return `${pathname}?${newQueryParams}`;
      }

      return pathname;
    },
    [pathname, searchParams],
  );
};
