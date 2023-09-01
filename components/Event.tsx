import { EventData } from '@/util/common';
import { Card } from '@/components/UI/Card';
import { GuideBox } from './GuideBox';
import { ChipWithTitle } from './ChipWIthTitle';
import Link from 'next/link';

interface EventProps {
  event: EventData | undefined;
}

export const Event = ({ event }: EventProps) => {
  const eventStyle = `w-full h-full bg-white border border-gray overflow-y-auto flex justify-center ${
    !event && 'items-center'
  }`;

  return (
    <>
      <Card className={eventStyle}>
        <>
          {event ? (
            <div className="w-full">
              <div className="h-52 flex flex-col items-center border-b border-solid">
                <div className="w-full">
                  <div className="flex justify-between">
                    <Link href="/home">
                      <div className="underline font-bold">Go back to events</div>
                    </Link>
                    <div className="flex flex-col items-center">
                      <h1 className="text-3xl my-2 font-bold">{event.title}</h1>
                      <h2 className="text-2xl mb-2 p-1">{event.shortDescription}</h2>
                    </div>
                    <div className="flex flex-col">
                      <ChipWithTitle chipText={event.importance} chipTitle="Importance:" />
                      <ChipWithTitle chipText={event.deadline} chipTitle="Deadline:" />
                    </div>
                  </div>
                </div>
                <GuideBox guideText="You can organize your event. To create tasks in event use button or card 'Add New Task'." />
              </div>
              <div>reszta contentu</div>
            </div>
          ) : (
            <EventNotFound />
          )}
        </>
      </Card>
    </>
  );
};

const EventNotFound = (): JSX.Element => {
  return <div className="text-3xl font-bold">Event not found</div>;
};
