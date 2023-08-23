import { Spin } from 'antd';

interface LoaderProps {
  size?: 'default' | 'small' | 'large';
}

export const Loader = ({ size = 'default' }: LoaderProps) => {
  return <Spin size={size} />;
};
