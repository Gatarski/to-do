import { Events } from '@/components/events/Events';

export interface EventsSearchParams {
  title: string;
  priority: string | string[];
}

interface HomeProps {
  searchParams: EventsSearchParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  return <Events searchParams={searchParams} />;
}
