import { Button as ButtonAnt, Space } from 'antd';
import React from 'react';

interface ButtonsProps {
  isDisabled: boolean;
  buttonText: string;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonsProps> = ({
  isDisabled,
  buttonText,
  htmlType = 'button',
  type = 'default',
  className,
}) => {
  return (
    <ButtonAnt className={className} htmlType={htmlType} disabled={isDisabled} type={type}>
      {buttonText}
    </ButtonAnt>
  );
};

export default Button;
