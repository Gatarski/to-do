'use client';
import { Card } from './UI/Card';
import { Input } from 'antd';
import { EventCardData } from '@/util/common';
import { EventCard } from './EventCard';
import { useState } from 'react';
import Button from './UI/Button';
import { AddNewItemCard } from './AddNewItemCard';
import { AddEventModal } from './AddEventModal';

const { Search } = Input;

export const Projects = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)

  const events = getEvents();
  const filteredEvents = filterEvents(searchValue, events);

  const areEvents = !!filteredEvents.length;
  const eventStyle = areEvents ? 'flex' : 'h-[90%] flex items-center justify-center';
  return (
    <>
      <Card className="w-[95%] h-[95%] bg-white border border-gray">
        <>
          <div className="mx-5">
            <Search
              className="py-5"
              placeholder={'Search events by title'}
              allowClear={false}
              enterButton="Search"
              size="large"
              onSearch={(value: string) => {
                setSearchValue(value);
              }}
            />
            {!areEvents && (
              <Button
                className="w-full"
                isDisabled={false}
                htmlType="submit"
                buttonText={'Add new event'}
              />
            )}
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
                <div
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  <AddNewItemCard buttonText="Add new event" />
                </div>
              </>
            ) : (
              <NoData />
            )}
          </div>
        </>
      </Card>
      <AddEventModal modalOpen={isModalOpen}></AddEventModal>
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
