'use client';
import { Modal as AntdModal } from 'antd';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  width?: string;
  className?: string;
  footer?: JSX.Element;
}

export const Modal = ({
  children,
  open,
  width = '600px',
  className = 'mobile:top-2',
  footer = <></>,
}: ModalProps) => {
  return (
    <AntdModal width={width} className={className} closable={false} open={open} footer={footer}>
      {children}
    </AntdModal>
  );
};
