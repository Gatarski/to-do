import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Tasks from '@/models/tasks';
import Projects from '@/models/projects';

interface TaskProps {
  params: { id : string };
}
export const PUT = async (_request: NextRequest, { params }: TaskProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();
  const taskFromDB = await Tasks.findOne({
    where: {
      id: id,
    },
  });

  // it check if Task belongs to logged user to avoid eg.: updating task from other users
  const isCorrectTask = taskFromDB?.UserId === userId;

  if (taskFromDB && isCorrectTask) {
    const currentIsDoneTask = taskFromDB.dataValues.isDone;
    await Tasks.update(
      { isDone: !currentIsDoneTask },
      {
        where: {
          id: id,
        },
      },
    );

    return NextResponse.json({}, { status: 200 });
  }
};

export const DELETE = async (request: NextRequest, { params }: TaskProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();
  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: userId,
    },
  });

  const taskFromDB = await Tasks.findOne({
    where: {
      id: id,
    },
  });
  const projectId = taskFromDB?.dataValues.ProjectId;

  // it check if Task belongs to logged user to avoid eg.: deleting from other users
  const isCorrectTask = projectsFromDB.some(project => project.id === projectId);

  if (taskFromDB && isCorrectTask) {
    taskFromDB.destroy();
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  }
};
