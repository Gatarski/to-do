import { Card } from './UI/Card';
import { ChipWithTitle } from './ChipWIthTitle';
import { ProfileForm } from './ProfileForm';
import { PreviewData, ProfileData } from '@/utils/common';

interface ProfileProps {
  profileData: ProfileData;
  previewData: PreviewData;
}

export const Profile = ({ profileData, previewData }: ProfileProps) => {
  const { projectsTotalNumber, projectsCompletedNumber, projectsWithCompletedTasks } = previewData;

  return (
    <Card className="w-full h-full bg-white border border-gray">
      <>
        <div className="flex flex-col items-center border-b border-solid py-5">
          <h1 className="text-3xl my-2 font-bold">Your profile and data</h1>
          <h2 className="text-2xl mb-3 p-1">Preview your data</h2>
        </div>
        <div className="flex items-center justify-center border-b border-solid gap-10 py-5">
          <div className="w-1/4 flex flex-col justify-end gap-2">
            <ChipWithTitle chipText={projectsTotalNumber} chipTitle="Total number of events:" />
            <ChipWithTitle
              chipText={projectsWithCompletedTasks}
              chipTitle="Events with completed tasks:"
            />
            <ChipWithTitle
              chipText={projectsCompletedNumber}
              chipTitle="Number of closed events:"
            />
          </div>
          <div className="w-1/4 flex flex-col justify-end gap-2">
            <ChipWithTitle chipText="0" chipTitle="Total number of tasks:" />
            <ChipWithTitle chipText="0" chipTitle="Number of completed tasks:" />
          </div>
          <div className="w-1/4 flex flex-col justify-end gap-2">
            <ChipWithTitle chipText="0" chipTitle="Total number of notes:" />
            <ChipWithTitle chipText="0" chipTitle="Total number of important notes:" />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center p-10">
          <div className="w-1/3">
            <ProfileForm profileData={profileData}></ProfileForm>
          </div>
        </div>
      </>
    </Card>
  );
};