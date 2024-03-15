import { Card } from '@/components/UI/Card';
import { Loader } from '@/components/UI/Loader';

export default function LoginLoader() {
  return (
    <Card className="w-1/2 flex items-center justify-center">
      <Loader size="large" />
    </Card>
  );
}
