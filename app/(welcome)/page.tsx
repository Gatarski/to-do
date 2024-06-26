import database from '@/lib/database';
import { WelcomePage } from '@/components/WelcomePage';
import Projects from '@/models/projects';
import Users from '@/models/users';
import Tasks from '@/models/tasks';
import Notes from '@/models/notes';

export default async function Home() {
  await syncWithDataBase();

  return (
    <div className="w-1/2 flex items-center justify-center bg-white mobile:w-full">
        <WelcomePage />
    </div>
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

      Tasks.belongsTo(Projects, { constraints: true, onDelete: 'CASCADE' });
      Projects.hasMany(Tasks);

      Tasks.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
      Users.hasMany(Tasks);

      Notes.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
      Users.hasMany(Notes);

      await syncModels();
      database.isInitialized = true;
    } catch (err) {
      console.log(err);
    }
  }
};
