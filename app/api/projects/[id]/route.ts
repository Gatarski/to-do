import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Projects from '@/models/projects';

interface ProjectParams {
  id: string;
}

interface ProjectProps {
  params: ProjectParams;
}

export const DELETE = async (_request: NextRequest, { params }: ProjectProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();

  const projectFromDB = await Projects.findOne({
    where: {
      id: id,
    },
  });

  // security - check if Project belongs to logged user to
  const isCorrectProject = projectFromDB?.UserId === userId;

  if (projectFromDB && isCorrectProject) {
    projectFromDB.destroy();
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  }
};

export const POST = async (request: NextRequest, { params }: ProjectProps) => {
  const id = params.id;
  const projectData = await request.json();
  const userId = await getUserIdFromCookie();

  const projectFromDB = await Projects.findOne({
    where: {
      id: id,
    },
  });

  // security - check if Project belongs to logged user to
  const isCorrectProject = projectFromDB?.UserId === userId;

  if (isCorrectProject) {
    await Projects.update(
      { ...projectData, UserId: userId },
      {
        where: {
          id: id,
        },
      },
    );
    return NextResponse.json({ message: 'Project edited.', status: 200 }, { status: 200 });
  }
};

export const PUT = async (_request: NextRequest, { params }: ProjectProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();

  const projectFromDB = await Projects.findOne({
    where: {
      id: id,
    },
  });

  // security - check if Project belongs to logged user to
  const isCorrectProject = projectFromDB?.UserId === userId;

  if (isCorrectProject) {
    const currentStatus = projectFromDB.dataValues.status;
    const nextStatus = currentStatus === 'closed' ? 'pending' : 'closed';
    await Projects.update(
      { status: nextStatus },
      {
        where: {
          id: id,
        },
      },
    );
    return NextResponse.json({ message: 'Project status changed.', status: 200 }, { status: 200 });
  }
};
