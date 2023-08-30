import { Card } from './UI/Card';
import { EventCardData } from '@/util/common';
import { EventCard } from './EventCard';
import { AddNewItemCard } from './AddNewItemCard';
import { SearchBar } from './SearchBar';
import { AddNewItemButton } from './AddNewItemButton';

interface ProjectProps {
  event: string;
}
export const Projects = ({ event }: ProjectProps) => {
  const events = getEvents();
  const filteredEvents = filterEvents(event, events);

  const areEvents = !!filteredEvents.length;
  const eventStyle = areEvents ? 'flex' : 'h-[90%] flex items-center justify-center';
  return (
    <>
      <Card className="w-[95%] h-[95%] bg-white border border-gray">
        <>
          <div className="mx-5">
            <SearchBar searchKeyUrl="event" placeholder="Search events by title" />
            {!areEvents && <AddNewItemButton buttonText="Add new event" modal="event" />}
          </div>
          <div className={eventStyle}>
            {areEvents ? (
              <>
                {filteredEvents.map((event: EventCardData, index) => {
                  return (
                    <EventCard
                      key={index}
                      title={event.title}
                      shortDescription={event.shortDescription}
                      importance={event.importance}
                      deadline={event.deadline}
                      status={event.status}
                    />
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

const getEvents = (): EventCardData[] => {
  // HERE API CALL FOR EVENTS
  const mockedData: EventCardData[] = [
    {
      title: 'Tajlandia',
      shortDescription: 'Podróż ślubna do Tajlandi',
      importance: 'small',
      deadline: '2023-12-05',
      status: 'pending',
    },
    {
      title: 'Malezja',
      shortDescription: 'short 2',
      importance: 'small',
      deadline: '2022-05-05',
      status: 'closed',
    },
  ];
  return mockedData;
};

const filterEvents = (filterValue: string, events: EventCardData[]): EventCardData[] => {
  return filterValue ? events.filter(event => event.title.includes(filterValue)) : events;
};

const NoData = (): JSX.Element => {
  return <div className="text-3xl font-bold">No events</div>;
};
