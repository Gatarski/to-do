import { Card } from './UI/Card';
import { EventData } from '@/util/common';
import { EventCard } from './EventCard';
import { AddNewItemCard } from './AddNewItemCard';
import { SearchBar } from './SearchBar';
import { AddNewItemButton } from './AddNewItemButton';
import Projects from '@/models/projects';
import { getUserIdFromCookie } from '@/lib/auth';
import Link from 'next/link';
import { GuideBox } from './GuideBox';

interface EventsProps {
  event: string;
}
export const Events = async ({ event }: EventsProps) => {
  const events = await getEvents();
  const filteredEvents = filterEvents(event, events);

  const areEvents = !!filteredEvents.length;
  const eventsStyle = areEvents ? 'flex flex-wrap' : 'h-[60%] flex items-center justify-center';
  return (
    <>
      <Card className="w-full h-full bg-white border border-gray overflow-y-auto">
        <>
          <div className="mx-5">
            <GuideBox guideText="You can organize future events. To create event use button or card 'Add New Event'. Click on event for more details." />
            <SearchBar searchKeyUrl="event" placeholder="Search events by title" />
            {!areEvents && <AddNewItemButton buttonText="Add new event" modal="event" />}
          </div>
          <div className={eventsStyle}>
            {areEvents ? (
              <>
                {filteredEvents.map((event: EventData, index) => {
                  return (
                    <Link key={index} href={`/events/${event.id}`}>
                      <EventCard
                        title={event.title}
                        shortDescription={event.shortDescription}
                        importance={event.importance}
                        deadline={event.deadline}
                        status={event.status}
                      />
                    </Link>
                  );
                })}
                <AddNewItemCard buttonText="Add new event" modal="event" />
              </>
            ) : (
              <NoData />
            )}
          </div>
        </>
      </Card>
    </>
  );
};

const getEvents = async (): Promise<EventData[]> => {
  const userId = await getUserIdFromCookie();
  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: userId,
    },
  });

  const events: EventData[] = projectsFromDB.map(project => {
    const projectData = project.dataValues;
    const { UserId, createdAt, updatedAt, ...event } = projectData;
    return event;
  });

  return events;
};

const filterEvents = (filterValue: string, events: EventData[]): EventData[] => {
  return filterValue ? events.filter(event => event.title.includes(filterValue)) : events;
};

const NoData = (): JSX.Element => {
  return <div className="text-3xl font-bold">No events</div>;
};
