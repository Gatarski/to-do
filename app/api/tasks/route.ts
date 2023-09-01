import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Tasks, { TasksDatabaseInterface } from '@/models/tasks';
import Projects from '@/models/projects';

const WRONG_PROJECT = 'You are trying add task to project which do not belongs to you';

export const POST = async (request: NextRequest) => {
  const taskData = (await request.json()) as TasksDatabaseInterface;
  const userId = await getUserIdFromCookie();
  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: userId,
    },
  });

  const payloadProjectId = taskData.ProjectId;

  const isCorrectProjectId = projectsFromDB.find(project => project.id === payloadProjectId);

  // it check if ProjectId from POST belongs to logged user to avoid eg.: adding task by postman to other projects.
  if (isCorrectProjectId && !isCorrectProjectId) {
    return NextResponse.json({ error: WRONG_PROJECT }, { status: 401 });
  }

  await Tasks.create(taskData);
  return NextResponse.json({ message: 'Task created.', status: 201 }, { status: 201 });
};
