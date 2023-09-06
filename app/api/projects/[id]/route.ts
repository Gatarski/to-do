import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Tasks from '@/models/tasks';
import Projects from '@/models/projects';

interface ProjectParams {
  id: string;
}

interface ProjectProps {
  params: ProjectParams;
}

export const DELETE = async (request: NextRequest, { params }: ProjectProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();
  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: userId,
    },
  });

  const projectFromDB = await Projects.findOne({
    where: {
      id: id,
    },
  });

  // it check if Project belongs to logged user to avoid eg.: deleting from other users
  const isCorrectProject = projectsFromDB.some(project => project.id?.toString() === id);

  if (projectFromDB && isCorrectProject) {
    projectFromDB.destroy();
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  }
};

export const PUT = async (request: NextRequest, { params }: ProjectProps) => {
  const id = params.id;
  const projectData = await request.json();
  const userId = await getUserIdFromCookie();

   const projectsFromDB = await Projects.findAll({
     where: {
       UserId: userId,
     },
   });

   // it check if Project belongs to logged user to avoid eg.: editing projects from other users
   const isCorrectProject = projectsFromDB.some(project => project.id?.toString() === id);
 
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