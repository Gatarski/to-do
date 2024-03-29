import { getUserFromCookie } from '@/lib/auth';
import { Logout } from './UI/Logout';
import { UserDatabaseInterface } from '@/models/users';
import { getCurrentDate } from '@/utils/utils';

export const TopPanel = async () => {
  const user = await getUserFromCookie();
  const { email, name } = user?.dataValues as UserDatabaseInterface;

  const userNameToDisplay = name ? name : email;
  const currentDate = getCurrentDate();

  return (
    <div className="min-h-[75px] border border-gray h-20 bg-white flex items-center justify-between">
      <div className="pl-6 text-xl flex portrait:text-base">
        You are logged as&nbsp;<div className="font-bold">{userNameToDisplay}</div>
        <div className="flex portrait:hidden">
          &nbsp;- today is&nbsp;
          <div className="font-bold">{currentDate}</div>
        </div>
      </div>
      <div className="pr-6">
        <Logout />
      </div>
    </div>
  );
};
