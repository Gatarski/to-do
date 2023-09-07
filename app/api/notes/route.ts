import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Notes from '@/models/notes';

export const POST = async (request: NextRequest) => {
  const notesData = await request.json();
  const userId = await getUserIdFromCookie();

  await Notes.create({ ...notesData, UserId: userId });
  return NextResponse.json({ message: 'Note created.', status: 201 }, { status: 201 });
};
