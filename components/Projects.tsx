import { Card } from './UI/Card';

export const Projects = () => {
  return (
    <Card className="w-[95%] h-[95%] bg-white border border-gray">
      <NoData></NoData>
    </Card>
  );
};

const NoData = (): JSX.Element => {
  return <div className="text-3xl font-bold">No events</div>;
};
