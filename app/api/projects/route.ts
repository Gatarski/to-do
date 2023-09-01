import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UserDatabaseInterface } from '@/models/users';
import Projects from '@/models/projects';

export const POST = async (request: NextRequest) => {
  const projectData = await request.json();
  const cookie = cookies();
  const user = await getUserFromCookie(cookie);
  const { id } = user?.dataValues as UserDatabaseInterface;

  await Projects.create({ ...projectData, UserId: id });
  return NextResponse.json({ message: 'Project created.', status: 201 }, { status: 201 });
};
