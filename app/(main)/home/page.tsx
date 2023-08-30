import { Projects } from '@/components/Projects';

interface HomeSearchParams {
  event: string;
  task: string;
}

interface HomeProps {
  searchParams: HomeSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const { event } = searchParams;
  return <Projects event={event} />;
}
