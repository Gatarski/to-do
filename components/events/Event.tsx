import { EventData, TaskData } from '@/types/types';
import { Card } from '@/components/UI/Card';
import { GuideBox } from '../UI/GuideBox';
import { ChipWithTitle } from '../UI/ChipWIthTitle';
import Link from 'next/link';
import { TaskCard } from '../tasks/TaskCard';
import { AddNewItemButton } from '../AddNewItemButton';
import { AddNewItemCard } from '../AddNewItemCard';
import Tasks from '@/models/tasks';
import Projects from '@/models/projects';
import { DeleteItemButton } from '../DeleteItemButton';
import { EditItemButton } from '../EditItemButton';
import { CloseEventButton } from './CloseEventButton';
import { NoData } from '@/utils/utils';

interface EventProps {
  event: EventData | undefined;
}

export const Event = async ({ event }: EventProps) => {
  const eventStyle = `w-full h-full bg-white border border-gray overflow-y-auto flex justify-center ${
    !event && 'items-center'
  }`;
  const eventId = event?.id;
  const tasks = await getTasks(eventId);
  const isEventClosed = event?.status === 'closed';

  const areTasks = !!tasks.length;
  const tasksStyle = areTasks ? 'flex flex-wrap' : 'h-1/2 flex items-center justify-center';
  const daysLeft = countDaysToEvent(event?.deadline as string);

  await changeProjectStatus(tasks, eventId, isEventClosed);

  return (
    <>
      <Card className={eventStyle}>
        <>
          {event ? (
            <div className="w-full">
              <div className="flex flex-col items-center border-b border-solid">
                <div className="w-full">
                  <div className="flex justify-between portrait:flex-col-reverse">
                    <div className="flex flex-col justify-between portrait:gap-3">
                      <Link href="/home">
                        <div className="underline font-bold">Go back to events</div>
                      </Link>
                      <div className="flex justify-between gap-3">
                        <CloseEventButton id={eventId} isClosed={isEventClosed} />
                        <DeleteItemButton itemType="event" id={eventId} text="Delete" />
                        <EditItemButton itemType="event" data={event} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center portrait:justify-center portrait:pl-3">
                      <h1 className="text-3xl my-2 font-bold">{event.title}</h1>
                      <h2 className="text-2xl mb-2 p-1 portrait:hidden">
                        {event.shortDescription}
                      </h2>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col portrait:hidden">
                        <ChipWithTitle chipText={event.priority} chipTitle="Priority:" />
                        <ChipWithTitle chipText={event.deadline as string} chipTitle="Deadline:" />
                      </div>
                      <div className="p-2 m-2 mb-6 flex items-center font-bold mobile:hidden">
                        <div>{daysLeft} days left</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <GuideBox guideText="You can organize your event. To create tasks in event use button or card 'Add New Task'. Click on task to complete it." />
                  <div className="ml-2 portrait:hidden">
                    <ChipWithTitle chipText={countCompletedTasks(tasks)} chipTitle="Completed:" />
                  </div>
                </div>
                {!areTasks && (
                  <AddNewItemButton
                    buttonText="Add new task"
                    itemType="task"
                    eventId={eventId}
                    isDisabled={isEventClosed}
                  />
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
                          priority={task.priority}
                          isDone={task.isDone}
                          id={task.id}
                          isDisabled={isEventClosed}
                        />
                      );
                    })}
                    <AddNewItemCard
                      buttonText="Add new task"
                      itemType="task"
                      eventId={eventId}
                      isDisabled={isEventClosed}
                    />
                  </>
                ) : (
                  <NoData message="No tasks" />
                )}
              </div>
            </div>
          ) : (
            <NoData message="Event not found" />
          )}
        </>
      </Card>
    </>
  );
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

const countDaysToEvent = (deadline?: string): string => {
  if (deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceBetweenDates = deadlineDate.getTime() - currentDate.getTime();

    const daysToDeadline = differenceBetweenDates / (1000 * 3600 * 24);
    return daysToDeadline.toFixed();
  }
  return '';
};

const changeProjectStatus = async (
  tasks: TaskData[],
  projectId: number | undefined,
  isEventClosed: boolean,
) => {
  const areAllTasksDone = tasks.every(task => task.isDone) && tasks.length;

  if (!isEventClosed && projectId) {
    await Projects.update(
      { status: areAllTasksDone ? 'tasks done' : 'pending' },
      {
        where: {
          id: projectId,
        },
      },
    );
  }
};
