import { Card } from './UI/Card';
import { EventData, EventStatus } from '@/utils/common';

export const EventCard = ({ title, shortDescription, priority, deadline, status }: EventData) => {
  return (
    <Card className="m-4 w-48 h-48 min-w-48 min-h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center">
      <>
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm py-1">{shortDescription}</p>
        <div>
          <div className="text-sm py-1">{deadline as string}</div>
          <Tag status={status} />
        </div>
      </>
    </Card>
  );
};

const getStyleForTag = (status: EventStatus): string => {
  const commonTagStyle =
    'inline-block px-2 py-1 border border-gray-300 rounded text-white text-sm font-bold';

  switch (status) {
    case 'pending':
      return `${commonTagStyle} bg-[#F6BE00]`;
    case 'closed':
      return `${commonTagStyle} bg-[#6D6F70]`;
    case 'tasks done':
      return `${commonTagStyle} bg-[#228B22]`;
  }
};

const Tag = ({ status }: { status: EventStatus }): JSX.Element => {
  const tagStyle = getStyleForTag(status);

  return <span className={tagStyle}>{status}</span>;
};
