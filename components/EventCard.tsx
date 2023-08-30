import { Card } from './UI/Card';
import { EventCardData } from '@/util/common';

export const EventCard = ({
  title,
  shortDescription,
  importance,
  deadline,
  status,
}: EventCardData) => {
  return (
    <Card className="m-5 w-48 h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center">
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

const getStatusTextStyling = (status: 'pending' | 'closed') => {
  switch (status) {
    case 'pending':
      return 'py-1 font-bold text-[#F6BE00] text-sm';
    case 'closed':
      return 'py-1 font-bold text-[#6D6F70] text-sm';
    default:
      return 'py-1 text-sm';
  }
};
