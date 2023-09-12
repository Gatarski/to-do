const Chip = ({ chipText }: { chipText: string | number }): JSX.Element => {
  return (
    <div className="flex w-20 max-h-6 justify-center text-xs bg-blue-50 border border-blue-700 p-1 my-2 font-bold">
      {chipText}
    </div>
  );
};

export const ChipWithTitle = ({ chipText, chipTitle }: { chipText: string | number, chipTitle: string }): JSX.Element => {
  return (
    <div className="flex justify-between">
      <div className="mr-2 mt-2 font-bold">{chipTitle}</div>
      <Chip chipText={chipText} />
    </div>
  );
};
