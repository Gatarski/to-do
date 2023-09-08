'use client';
import { Switch as AntdSwitch } from 'antd';
import { useField } from 'formik';
import { FC } from 'react';

interface SwitchProps {
  labelText: string;
  name: string;
  id: string;
}

export const Switch: FC<SwitchProps> = ({ labelText, name, ...rest }) => {
  const [field, meta, { setValue }] = useField({ name, ...rest });

  return (
    <div className="flex flex-col m-3 p-2 text-left">
      <label className="text-xs pb-1">{labelText}</label>
      <AntdSwitch
        className="w-12 bg-slate-400"
        onChange={(value: boolean) => {
          setValue(value);
        }}
        defaultChecked={field.value}
      />
    </div>
  );
};
