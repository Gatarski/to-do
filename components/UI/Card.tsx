import { ReactElement } from 'react';

interface CardProps {
  children: ReactElement;
  className?: string;
}

export const Card = ({ className, children }: CardProps) => {
  return <div className={`px-10 py-5 drop-shadow-xl bg-white ${className}`}>{children}</div>;
};
