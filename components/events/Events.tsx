import { Card } from '../UI/Card';
import { EventData } from '@/types/types';
import { EventCard } from './EventCard';
import { AddNewItemCard } from '../AddNewItemCard';
import { SearchBar } from '../SearchBar';
import { AddNewItemButton } from '../AddNewItemButton';
import Projects from '@/models/projects';
import { getUserIdFromCookie } from '@/lib/auth';
import Link from 'next/link';
import { GuideBox } from '../UI/GuideBox';
import { NoData } from '@/utils/utils';
import { FilterDropdown } from '../FilterDropdown';
import { EventsSearchParams } from '@/app/(main)/home/page';

interface EventsProps {
  searchParams: EventsSearchParams;
}

export const Events = async ({ searchParams }: EventsProps) => {
  const events = await getEvents();
  const sortedEvents = sortEventsByStatus(events).reverse();
  const filteredEvents = filterEvents(searchParams, sortedEvents);

  const areEvents = !!filteredEvents.length;
  const eventsStyle = areEvents
    ? 'flex flex-wrap'
    : 'h-[60%] flex items-center justify-center mobile:h-auto';
  return (
    <>
      <Card className="w-full h-full bg-white border border-gray overflow-y-auto">
        <>
          <div className="mx-5">
            <GuideBox guideText="You can organize future events. To create event use button or card 'Add New Event'. Click on event for more details." />
            <div className="flex">
              <SearchBar searchKeyUrl="title" placeholder="Search events by title" />
              <FilterDropdown
                filterDescription="Filter by priority"
                filterKeyUrl="priority"
                filterOptions={['small', 'medium', 'urgent']}
              />
            </div>
            {!areEvents && <AddNewItemButton buttonText="Add new event" itemType="event" />}
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
                        priority={event.priority}
                        deadline={event.deadline}
                        status={event.status}
                      />
                    </Link>
                  );
                })}
                <AddNewItemCard buttonText="Add new event" itemType="event" />
              </>
            ) : (
              <NoData message="No events" />
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

const filterEvents = (searchParams: EventsSearchParams, events: EventData[]): EventData[] => {
  const { title, priority } = searchParams;

  let filteredEvents = events;

  if (title) {
    filteredEvents = events.filter(event => event.title.includes(title));
  }

  if (priority) {
    filteredEvents = filteredEvents.filter(event => priority.includes(event.priority));
  }

  return filteredEvents;
};

const sortEventsByStatus = (events: EventData[]): EventData[] => {
  return events.sort((a, b) => a.status.localeCompare(b.status));
};
