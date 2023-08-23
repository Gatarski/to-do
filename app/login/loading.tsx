import { Card } from '@/components/UI/Card';
import { Loader } from '@/components/UI/Loader';

export default function LoginLoader() {
  return (
    <Card className="w-1/3 h-1/3 flex items-center justify-center">
      <Loader size="large" />
    </Card>
  );
}
