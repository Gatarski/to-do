import { PlusCircleTwoTone } from '@ant-design/icons';
import { Card } from './UI/Card';
import { ICON_SIZE } from '@/util/common';

interface AddNewItemCardProps {
  buttonText: string;
}

export const AddNewItemCard = ({ buttonText }: AddNewItemCardProps) => {

  return (
    <Card
      className={
        'm-5 w-48 h-48 cursor-pointer transition-transform hover:scale-105 flex flex-col justify-center items-center border border-dashed border-[#1677ff] hover:bg-gray-200'
      }
    >
      <>
        <PlusCircleTwoTone style={{ fontSize: ICON_SIZE }} />
        <label>{buttonText}</label>
      </>
    </Card>
  );
};
