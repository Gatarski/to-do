import { Tag } from './Tag';
import { Card } from './UI/Card';
import { NoteData } from '@/utils/common';

export const NoteCard = ({ title, isImportant }: NoteData) => {
  const tagType = isImportant ? 'major' : 'minor';

  return (
    <Card className="m-4 w-48 h-48 min-w-48 min-h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center gap-5">
      <>
        <h1 className="font-bold">{title}</h1>
        <div>
          <Tag tagType={tagType} />
        </div>
      </>
    </Card>
  );
};
