import { Button as ButtonAnt } from 'antd';
import React from 'react';

interface ButtonsProps {
  buttonText: string;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: Function;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonsProps> = ({
  buttonText,
  htmlType = 'button',
  type = 'default',
  className,
  onClick,
  isDisabled = false,
}) => {
  return (
    <ButtonAnt
      className={className}
      htmlType={htmlType}
      disabled={isDisabled}
      type={type}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {buttonText}
    </ButtonAnt>
  );
};

export default Button;
