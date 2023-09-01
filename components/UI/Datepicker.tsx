'use client';
import { DatePicker } from 'antd';
import { useField } from 'formik';
import { FC } from 'react';

interface DatepickerProps {
  labelText: string;
  placeholder: string;
  name: string;
  id: string;
}

export const Datepicker: FC<DatepickerProps> = ({ labelText, placeholder, name, ...rest }) => {
  const [field, meta, { setValue }] = useField({ name, ...rest });

  return (
    <div className="flex flex-col m-3 p-2 text-left">
      <label className={`text-xs ${meta.error && 'text-red-600'}`}>{labelText}</label>
      <DatePicker
        className={`pl-1 leading-normal rounded-none h-10 ${
          meta.error && 'border-red-600 hover:border-red-600'
        }`}
        allowClear={false}
        showToday={true}
        defaultValue={field.value}
        onChange={(_, date) => {
          setValue(date);
        }}
        placeholder={placeholder}
        {...rest}
      />
      <div className="text-xs text-red-600">{meta.error ? meta.error : ''}</div>
    </div>
  );
};
