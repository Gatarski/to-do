import { Tag } from '../UI/Tag';
import { Card } from '../UI/Card';
import { EventData } from '@/types/types';
import { EVENT_CARD_SIZE_STYLE } from '@/constants/sizes';

export const EventCard = ({ title, shortDescription, deadline, status }: EventData) => {
  const cardStyle = `${EVENT_CARD_SIZE_STYLE} m-4 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center`;

  return (
    <Card className={cardStyle}>
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
