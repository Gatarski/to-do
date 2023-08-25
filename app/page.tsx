import { Card } from '@/components/UI/Card';
import database from '@/lib/database';
import { WelcomePage } from '@/components/WelcomePage';

export default async function Home() {
  await syncWithDataBase();

  return (
    <Card>
      <WelcomePage />
    </Card>
  );
}

const syncWithDataBase = async () => {
  async function syncModels() {
    await database.db.sync();
  }

  if (!database.isInitialized) {
    try {
      await syncModels();
      database.isInitialized = true;
    } catch (err) {
      console.log(err);
    }
  }
};
