import { Events } from '@/components/events/Events';

interface HomeSearchParams {
  event: string;
  task: string;
}

interface HomeProps {
  searchParams: HomeSearchParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { event } = searchParams;
  return <Events event={event} />;
}
