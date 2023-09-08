import { Tag } from '../UI/Tag';
import { Card } from '../UI/Card';
import { EventData } from '@/utils/common';

export const EventCard = ({ title, shortDescription, deadline, status }: EventData) => {
  return (
    <Card className="m-4 w-48 h-48 min-w-48 min-h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center">
      <>
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm py-1">{shortDescription}</p>
        <div>
          <div className="text-sm py-1">{deadline as string}</div>
          <Tag tagType={status} />
        </div>
      </>
    </Card>
  );
};
