import { EventData } from '@/util/common';
import Projects from '@/models/projects';
import { ProjectDatabaseInterface } from '@/models/projects';
import { Event } from '@/components/Event';
import { getUserIdFromCookie } from '@/lib/auth';

interface EventPageParams {
  id: string;
}

interface EventPageProps {
  params: EventPageParams;
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id);

  return <Event event={event} />;
}

const getEvent = async (id: string): Promise<EventData | undefined> => {
  const userId = await getUserIdFromCookie();
  const projectFromDB = await Projects.findByPk(id);
  const isProjectBelongsToUser = userId === projectFromDB?.UserId;
  if (isProjectBelongsToUser && projectFromDB) {
    const projectData = projectFromDB?.dataValues as ProjectDatabaseInterface;
    const { UserId, createdAt, updatedAt, ...event } = projectData;

    return event;
  }
  return undefined;
};
