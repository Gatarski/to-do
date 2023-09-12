import { Tag } from '../UI/Tag';
import { Card } from '../UI/Card';
import { NoteData } from '@/types/types';
import NotesIcon from '../../assets/icons/NotesIcon.png';
import Image from 'next/image';

export const NoteCard = ({ title, isImportant }: NoteData) => {
  const tagType = isImportant ? 'major' : 'minor';

  return (
    <Card className="m-4 w-64 h-32 min-w-48 min-h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center gap-5">
      <>
        <div className="flex justify-between">
          <h1 className="font-bold">{title}</h1>
          <Image className="w-5 h-5" src={NotesIcon} alt="Note icon" />
        </div>
        <div>
          <Tag tagType={tagType} />
        </div>
      </>
    </Card>
  );
};
