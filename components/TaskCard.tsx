'use client';
import { ChipWithTitle } from './ChipWIthTitle';
import { Card } from './UI/Card';
import { TaskData } from '@/utils/common';
import '../styles/taskCard.css';
import { doneTaskAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { DeleteItemButton } from './DeleteItemButton';
import { useCallback } from 'react';

export const TaskCard = ({ task, priority, isDone, id, isDisabled }: TaskData) => {
  const disabledCardStyle = 'bg-slate-100 transition-none hover:scale-100 cursor-not-allowed';
  const cardStyle = `m-4 w-64 h-32 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-between px-2 py-0 ${
    isDisabled && disabledCardStyle
  }`;

  const onClick = useOnClick(isDisabled, id);

  return (
    <div onClick={onClick}>
      <Card className={cardStyle}>
        <>
          <div className="flex justify-between">
            <p className="text-sm py-1">{task}</p>
            <div
              onClick={e => {
                // this is used to avoid onClick from parent when click modal backdrop
                e.stopPropagation();
              }}
            >
              {!isDisabled && <DeleteItemButton itemType="task" id={id} />}
            </div>
          </div>
          <div>
            {isDone ? (
              <div className="flex w-10 h-10 items-center">
                <Checkmark />
              </div>
            ) : (
              <ChipWithTitle chipText={priority} chipTitle="Priority:" />
            )}
          </div>
        </>
      </Card>
    </div>
  );
};

const Checkmark = (): JSX.Element => {
  return (
    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  );
};

const useOnClick = (isDisabled: boolean | undefined, id: string | undefined) => {
  const router = useRouter();
  return useCallback(async () => {
    if (!isDisabled) {
      await doneTaskAPI(id);
      router.refresh();
    }
  }, [isDisabled, id]);
};
