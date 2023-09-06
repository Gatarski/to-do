import { Profile } from '@/components/Profile';
import { getUserFromCookie } from '@/lib/auth';
import Projects from '@/models/projects';
import { UserDatabaseInterface } from '@/models/users';
import { PreviewData, ProfileData } from '@/utils/common';

export default async function ProfilePage() {
  const user = await getUserFromCookie();
  const { id, name, email } = user?.dataValues as UserDatabaseInterface;

  const projectsFromDB = await Projects.findAll({
    where: {
      UserId: id,
    },
  });

  const projectsTotalNumber = projectsFromDB.length;
  const projectsCompletedNumber = projectsFromDB.filter(
    project => project.status === 'closed',
  ).length;
  const projectsWithCompletedTasks = projectsFromDB.filter(
    project => project.status === 'tasks done',
  ).length;

  const profileData: ProfileData = { name, email };
  const previewData: PreviewData = {
    projectsTotalNumber,
    projectsCompletedNumber,
    projectsWithCompletedTasks,
  };

  return <Profile profileData={profileData} previewData={previewData} />;
}
