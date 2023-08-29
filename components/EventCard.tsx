import { Card } from './UI/Card';

interface EventCardProps {
  title: string;
  shortDescription: string;
  importance: 'small' | 'medium' | 'very';
  deadline: string;
}

export const EventCard = ({ title, shortDescription, importance, deadline }: EventCardProps) => {
  return (
    <Card>
      <>
        <h1>{title}</h1>
        <p>{shortDescription}</p>
        <div>
          <div>{importance}</div>
          <div>{deadline}</div>
        </div>
      </>
    </Card>
  );
};
