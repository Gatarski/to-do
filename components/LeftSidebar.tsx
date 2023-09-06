import { SidebarLink } from './SidebarLink';
import { Card } from './UI/Card';

export type IconType = 'Events' | 'Profile' | 'Notes';

export interface LinkInterface {
  label: string;
  icon: IconType;
  link: string;
}

const links: LinkInterface[] = [
  { label: 'Events', icon: 'Events', link: '/home' },
  { label: 'Notes', icon: 'Notes', link: '/notes' },
  { label: 'Profile', icon: 'Profile', link: '/profile' },
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
