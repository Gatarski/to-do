'use client';
import { Input } from 'antd';
import { useField } from 'formik';
import { FC, useState } from 'react';

interface TextAreaProps {
  labelText: string;
  placeholder: string;
  name: string;
  id: string;
  maxLength: number;
}
const { TextArea: AntTextArea } = Input;

export const TextArea: FC<TextAreaProps> = ({
  labelText,
  placeholder,
  name,
  maxLength,
  ...rest
}) => {
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
      <AntTextArea
        className={`pl-1 leading-normal rounded-none h-20 ${
          isError && 'border-red-600 hover:border-red-600'
        }`}
        {...rest}
        {...field}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={maxLength}
        showCount={true}
      />
      <div className="text-xs text-red-600">{isError ? meta.error : ''}</div>
    </div>
  );
};
