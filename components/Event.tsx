import { EventData, TaskData } from '@/util/common';
import { Card } from '@/components/UI/Card';
import { GuideBox } from './GuideBox';
import { ChipWithTitle } from './ChipWIthTitle';
import Link from 'next/link';
import { TaskCard } from './TaskCard';
import { AddNewItemButton } from './AddNewItemButton';
import { AddNewItemCard } from './AddNewItemCard';
import Tasks from '@/models/tasks';

interface EventProps {
  event: EventData | undefined;
}

export const Event = async ({ event }: EventProps) => {
  const eventStyle = `w-full h-full bg-white border border-gray overflow-y-auto flex justify-center ${
    !event && 'items-center'
  }`;
  const eventId = event?.id;
  const tasks = await getTasks(eventId);

  const areTasks = !!tasks.length;
  const tasksStyle = areTasks ? 'flex flex-wrap' : 'h-1/2 flex items-center justify-center';
  return (
    <>
      <Card className={eventStyle}>
        <>
          {event ? (
            <div className="w-full">
              <div className="flex flex-col items-center border-b border-solid">
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
                <div className="w-full flex items-center">
                  <GuideBox guideText="You can organize your event. To create tasks in event use button or card 'Add New Task'." />
                  <div className="ml-2">
                    <ChipWithTitle chipText={countCompletedTasks(tasks)} chipTitle="Completed:" />
                  </div>
                </div>
                {!areTasks && (
                  <AddNewItemButton buttonText="Add new task" modal="task" eventId={eventId} />
                )}
              </div>
              <div className={tasksStyle}>
                {areTasks ? (
                  <>
                    {tasks.map((task: TaskData, index) => {
                      return (
                        <TaskCard
                          key={index}
                          task={task.task}
                          importance={task.importance}
                          isDone={task.isDone}
                        />
                      );
                    })}
                    <AddNewItemCard buttonText="Add new task" modal="task" eventId={eventId} />
                  </>
                ) : (
                  <NoData />
                )}
              </div>
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

const NoData = (): JSX.Element => {
  return <div className="text-3xl font-bold">No tasks</div>;
};

const countCompletedTasks = (tasks: TaskData[]): string => {
  const tasksNumber = tasks.length;
  const completedTasks = tasks.filter(task => task.isDone).length;

  return `${completedTasks}/${tasksNumber}`;
};

const getTasks = async (id: number | undefined): Promise<TaskData[]> => {
  if (!id) {
    return [];
  }
  const tasksFromDB = await Tasks.findAll({
    where: {
      ProjectId: id,
    },
  });

  const tasks: TaskData[] = tasksFromDB.map(taskFromDB => {
    const projectData = taskFromDB.dataValues;
    const { ProjectId, createdAt, updatedAt, ...task } = projectData;
    return task;
  });
  return tasks;
};
