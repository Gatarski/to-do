import { Card } from '../UI/Card';
import { NoteData } from '@/utils/common';
import { AddNewItemCard } from '../AddNewItemCard';
import Notes from '@/models/notes';
import { getUserIdFromCookie } from '@/lib/auth';
import { GuideBox } from '../UI/GuideBox';
import { AddNewItemButton } from '../AddNewItemButton';
import { NoData } from '@/utils/utils';
import Link from 'next/link';
import { NoteCard } from './NoteCard';

export const NotesPage = async () => {
  const notes = await getNotes();

  const areNotes = !!notes.length;
  const notesStyle = areNotes ? 'flex flex-wrap' : 'h-[60%] flex items-center justify-center';
  return (
    <>
      <Card className="w-full h-full bg-white border border-gray overflow-y-auto">
        <>
          <div className="mx-5">
            <GuideBox guideText="You can create notes. To create note use button or card 'Add new note'. Click on note for more details." />
            {!areNotes && <AddNewItemButton buttonText="Add new note" itemType="note" />}
          </div>
          <div className={notesStyle}>
            {areNotes ? (
              <>
                {notes.map((note: NoteData, index) => {
                  return (
                    <Link key={index} href={`/notes/${note.id}`}>
                      <NoteCard title={note.title} isImportant={note.isImportant} />
                    </Link>
                  );
                })}
                <AddNewItemCard buttonText="Add new notes" itemType="note" />
              </>
            ) : (
              <NoData message="No notes" />
            )}
          </div>
        </>
      </Card>
    </>
  );
};

const getNotes = async (): Promise<NoteData[]> => {
  const userId = await getUserIdFromCookie();
  const notesFromDB = await Notes.findAll({
    where: {
      UserId: userId,
    },
  });

  const notes: NoteData[] = notesFromDB.map(note => {
    const noteData = note.dataValues;
    const { UserId, createdAt, updatedAt, ...filteredNote } = noteData;
    return filteredNote;
  });

  return notes;
};
