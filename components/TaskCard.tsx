import { ChipWithTitle } from './ChipWIthTitle';
import { Card } from './UI/Card';
import { TaskData } from '@/util/common';

export const TaskCard = ({ task, importance, isDone }: TaskData) => {
  return (
    <Card className="m-4 w-64 h-24 min-w-64 min-h-28 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center px-2 py-0">
      <>
        <p className="text-sm py-1">{task}</p>
        <div>
          <ChipWithTitle chipText={importance} chipTitle="Importance:" />
        </div>
      </>
    </Card>
  );
};
