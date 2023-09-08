import { getUserIdFromCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Notes from '@/models/notes';

interface NoteProps {
  params: { id: string };
}

export const DELETE = async (_request: NextRequest, { params }: NoteProps) => {
  const id = params.id;
  const userId = await getUserIdFromCookie();

  const noteFromDB = await Notes.findOne({
    where: {
      id: id,
    },
  });

  // security - check if Note belongs to logged user to
  const isCorrectNote = noteFromDB?.UserId === userId;

  if (noteFromDB && isCorrectNote) {
    noteFromDB.destroy();
    return NextResponse.json({ message: 'Note deleted' }, { status: 200 });
  }
};

export const POST = async (request: NextRequest, { params }: NoteProps) => {
  const id = params.id;
  const noteData = await request.json();
  const userId = await getUserIdFromCookie();

  const noteFromDB = await Notes.findOne({
    where: {
      id: id,
    },
  });

  // security - check if Note belongs to logged user to
  const isCorrectNote = noteFromDB?.UserId === userId;

  if (isCorrectNote) {
    await Notes.update(
      { ...noteData, UserId: userId },
      {
        where: {
          id: id,
        },
      },
    );
    return NextResponse.json({ message: 'Note edited.', status: 200 }, { status: 200 });
  }
};
