'use client';
import { Input as InputAnt } from 'antd';
import { useField } from 'formik';
import { FC, useState } from 'react';

interface InputProps {
  labelText: string;
  placeholder: string;
  name: string;
  id: string;
  type?: string;
  disabled?: boolean;
}

export const Input: FC<InputProps> = ({ labelText, placeholder, name, type, ...rest }) => {
  const [field, meta] = useField({ name, ...rest });
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  const isError = !isFocus && meta.error;
  return (
    <div className="m-3 p-2 text-left mobile:m-1 mobile:p-1">
      <label className={`text-xs ${isError && 'text-red-600'}`}>{labelText}</label>
      <InputAnt
        className={`pl-1 leading-normal rounded-none h-10 ${
          isError && 'border-red-600 hover:border-red-600'
        }`}
        {...rest}
        {...field}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
      />
      <div className="text-xs text-red-600">{isError ? meta.error : ''}</div>
    </div>
  );
};
