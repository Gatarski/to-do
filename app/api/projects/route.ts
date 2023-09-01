import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Projects from '@/models/projects';

export const POST = async (request: NextRequest) => {
  const projectData = await request.json();
  const userId = await getUserIdFromCookie();

  await Projects.create({ ...projectData, UserId: userId });
  return NextResponse.json({ message: 'Project created.', status: 201 }, { status: 201 });
};
