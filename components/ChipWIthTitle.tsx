interface ChipProps {
  chipText: string;
}

interface ChipWithTitle {
  chipTitle: string;
  chipText: string;
}

const Chip = ({ chipText }: ChipProps): JSX.Element => {
  return (
    <div className="flex w-20 justify-center text-xs bg-[#F0F5FF] border border-[#2147ED] p-1 my-2 font-bold">
      {chipText}
    </div>
  );
};

export const ChipWithTitle = ({ chipText, chipTitle }: ChipWithTitle): JSX.Element => {
  return (
    <div className="flex justify-between">
      <div className="mr-2 mt-2 font-bold">{chipTitle}</div>
      <Chip chipText={chipText} />
    </div>
  );
};
