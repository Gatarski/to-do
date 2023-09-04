import { Card } from './UI/Card';
import { EventData } from '@/utils/common';

export const EventCard = ({ title, shortDescription, priority, deadline, status }: EventData) => {
  return (
    <Card className="m-4 w-48 h-48 min-w-48 min-h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center">
      <>
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm py-1">{shortDescription}</p>
        <div>
          <div className="text-sm py-1">{deadline}</div>
          <div className={getStatusTextStyling(status)}>{status}</div>
        </div>
      </>
    </Card>
  );
};

const getStatusTextStyling = (status: 'pending' | 'closed' | 'tasks done') => {
  switch (status) {
    case 'pending':
      return 'py-1 font-bold text-[#F6BE00] text-sm';
    case 'closed':
      return 'py-1 font-bold text-[#6D6F70] text-sm';
    case 'tasks done':
      return 'py-1 font-bold text-[#00FF00] text-sm';
    default:
      return 'py-1 text-sm';
  }
};
