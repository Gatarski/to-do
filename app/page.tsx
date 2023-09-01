import { Card } from '@/components/UI/Card';
import database from '@/lib/database';
import { WelcomePage } from '@/components/WelcomePage';
import Projects from '@/models/projects';
import Users from '@/models/users';

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
      Projects.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
      Users.hasMany(Projects);
      await syncModels();
      database.isInitialized = true;
    } catch (err) {
      console.log(err);
    }
  }
};
