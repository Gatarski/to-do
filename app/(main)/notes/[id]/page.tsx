import { NoteData } from '@/utils/common';
import { getUserIdFromCookie } from '@/lib/auth';
import Notes, { NotesDatabaseInterface } from '@/models/notes';
import { Note } from '@/components/notes/Note';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNote(params.id);
  return <Note note={note} />;
}

const getNote = async (id: string): Promise<NoteData | undefined> => {
  const userId = await getUserIdFromCookie();
  const noteFromDB = await Notes.findByPk(id);
  const isNoteBelongToUser = userId === noteFromDB?.UserId;
  if (isNoteBelongToUser && noteFromDB) {
    const NoteData = noteFromDB?.dataValues as NotesDatabaseInterface;
    const { UserId, createdAt, updatedAt, ...note } = NoteData;

    return NoteData;
  }
  return undefined;
};
