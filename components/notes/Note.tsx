import { NoteData } from '@/utils/common';
import { Card } from '@/components/UI/Card';
import { GuideBox } from '../UI/GuideBox';
import Link from 'next/link';
import { DeleteItemButton } from '../DeleteItemButton';
import { Tag } from '../UI/Tag';
import { EditItemButton } from '../EditItemButton';
import { NoData } from '@/utils/utils';

interface NoteProps {
  note: NoteData | undefined;
}

export const Note = async ({ note }: NoteProps) => {
  const noteStyle = `w-full h-full bg-white border border-gray overflow-y-auto flex justify-center ${
    !note && 'items-center'
  }`;
  const noteId = note?.id;
  const tagType = note?.isImportant ? 'major' : 'minor';

  return (
    <Card className={noteStyle}>
      <>
      {note ? (
      <div className="w-full">
        <div className="flex flex-col items-center border-b border-solid">
          <div className="w-full">
            <div className="h-20 flex justify-between">
              <div className="flex flex-col justify-between">
                <Link href="/notes">
                  <div className="underline font-bold">Go back to notes</div>
                </Link>
                <div className="flex justify-between gap-3">
                  <DeleteItemButton itemType="note" id={noteId} text="Delete" />
                  <EditItemButton itemType="note" data={note} />
                </div>
              </div>
              <h1 className="text-3xl my-2 font-bold">{note?.title}</h1>
              <Tag tagType={tagType} />
            </div>
          </div>
          <div className="w-full flex items-center">
            <GuideBox guideText="Preview and edit your note. You can edit, delete your note." />
          </div>
        </div>
        <div className="h-2/3 flex flex-col text-center p-5">
          <label className="text-xs self-start">Your note:</label>
          <textarea
            value={note?.note}
            disabled={true}
            rows={5}
            className="w-full h-full border p-5"
          ></textarea>
        </div>
      </div>
      ) : (
            <NoData message='Note not found'/>
          )}
        </>
    </Card>
  );
};