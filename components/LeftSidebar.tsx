import { SidebarLink } from './SidebarLink';
import { Card } from './UI/Card';

export type IconType = 'Appstore' | 'Settings' | 'File';

export interface LinkInterface {
  label: string;
  icon: IconType;
  link: string;
}

const links: LinkInterface[] = [
  { label: 'Home', icon: 'Appstore', link: '/home' },
  { label: 'Notes', icon: 'File', link: '/notes' },
  { label: 'Setting', icon: 'Settings', link: '/settings' },
];

export const LeftSidebar = () => {
  return (
    <Card className="rounded-s-2xl h-full w-40 flex items-center justify-between flex-wrap">
      <>
        {links.map(({ link, icon, label }, index) => (
          <SidebarLink key={index} link={link} icon={icon} label={label} />
        ))}
      </>
    </Card>
  );
};
