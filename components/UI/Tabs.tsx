'use client';

import { Radio } from 'antd';
import { useField } from 'formik';
import { FC } from 'react';

interface TabsProps {
  labelText: string;
  name: string;
  id: string;
  options: string[];
}

export const Tabs: FC<TabsProps> = ({ labelText, name, options, ...rest }) => {
  const [field, meta] = useField({ name, ...rest });

  return (
    <div className="flex flex-col m-3 p-2 text-left">
      <label className="text-xs pb-1">{labelText}</label>
      <Radio.Group {...rest} {...field}>
        {options?.map((option, index) => {
          return (
            <Radio.Button key={index} value={option}>
              {option}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
};
