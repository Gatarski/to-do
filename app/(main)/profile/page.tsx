import { Profile } from '@/components/profile/Profile';
import { getUserFromCookie } from '@/lib/auth';
import Notes from '@/models/notes';
import Projects from '@/models/projects';
import Tasks from '@/models/tasks';
import { UserDatabaseInterface } from '@/models/users';
import { PreviewData, ProfileData } from '@/types/types';

export default async function ProfilePage() {
  const user = await getUserFromCookie();
  const { id, name, email } = user?.dataValues as UserDatabaseInterface;

  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: id,
    },
  });

  const tasksFromDB = await Tasks.findAll({
    where: {
      UserId: id,
    }
  })

  const notesFromDB = await Notes.findAll({
    where: {
      UserId: id
    }
  })

  const projectsTotalNumber = projectsFromDB.length;
  const projectsCompletedNumber = projectsFromDB.filter(
    project => project.status === 'closed',
  ).length;
  const projectsWithCompletedTasks = projectsFromDB.filter(
    project => project.status === 'tasks done',
  ).length;
  const tasksTotalNumber = tasksFromDB.length;
  const tasksCompletedNumber = tasksFromDB.filter(task => task.isDone).length;
  const notesTotalNumber = notesFromDB.length;
  const notesImportantNumber = notesFromDB.filter(task => task.isImportant).length;

  const profileData: ProfileData = { name, email };
  const previewData: PreviewData = {
    projectsTotalNumber,
    projectsCompletedNumber,
    projectsWithCompletedTasks,
    tasksTotalNumber,
    tasksCompletedNumber,
    notesTotalNumber,
    notesImportantNumber,
  };

  return <Profile profileData={profileData} previewData={previewData} />;
}
