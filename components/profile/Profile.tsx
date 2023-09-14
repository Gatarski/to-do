import { Card } from '../UI/Card';
import { ChipWithTitle } from '../UI/ChipWIthTitle';
import { DeleteUserButton } from './DeleteUserButton';
import { ProfileForm } from './ProfileForm';
import { PreviewData, ProfileData } from '@/types/types';

interface ProfileProps {
  profileData: ProfileData;
  previewData: PreviewData;
}

export const Profile = ({ profileData, previewData }: ProfileProps) => {
  const {
    projectsTotalNumber,
    projectsCompletedNumber,
    projectsWithCompletedTasks,
    tasksTotalNumber,
    tasksCompletedNumber,
    notesTotalNumber,
    notesImportantNumber,
  } = previewData;

  return (
    <Card className="w-full h-full bg-white border border-gray overflow-y-auto">
      <>
        <div className="flex flex-col items-center border-b border-solid py-5 mobile:py-1 justify-center">
          <h1 className="text-3xl my-2 font-bold portrait:text-2xl">Your profile and data</h1>
          <h2 className="text-2xl mb-3 p-1 portrait:text-xl">Preview your data</h2>
        </div>
        <div className="flex flex-row items-start justify-center border-b border-solid gap-10 py-5 mobile:justify-between">
          <div className="flex flex-col justify-end gap-2">
            <label className="self-center text-xl font-bold">Events</label>
            <ChipWithTitle chipText={projectsTotalNumber} chipTitle="Total number of events:" />
            <ChipWithTitle
              chipText={projectsWithCompletedTasks}
              chipTitle="Events with completed tasks:"
            />
            <ChipWithTitle
              chipText={projectsCompletedNumber}
              chipTitle="Number of closed events:"
              className="mobile:hidden"
            />
          </div>
          <div className="flex flex-col justify-end gap-2 mobile:hidden">
            <label className="self-center text-xl font-bold">Tasks</label>
            <ChipWithTitle chipText={tasksTotalNumber} chipTitle="Total number of tasks:" />
            <ChipWithTitle chipText={tasksCompletedNumber} chipTitle="Number of completed tasks:" />
            <div></div>
          </div>
          <div className="flex flex-col justify-end gap-2 portrait:hidden">
            <label className="self-center text-xl font-bold">Notes</label>
            <ChipWithTitle chipText={notesTotalNumber} chipTitle="Total number of notes:" />
            <ChipWithTitle
              chipText={notesImportantNumber}
              chipTitle="Total number of important notes:"
            />
          </div>
        </div>
        <div className="w-full flex flex-col pt-5 portrait:flex-col-reverse portrait:justify-between portrait:gap-5">
          <div className="self-end justify-self-end portrait:self-center">
            <DeleteUserButton></DeleteUserButton>
          </div>
          <div className="self-center w-1/3 portrait:w-auto portrait:border-b portrait:border-solid portrait:pb-5">
            <ProfileForm profileData={profileData}></ProfileForm>
          </div>
        </div>
      </>
    </Card>
  );
};
