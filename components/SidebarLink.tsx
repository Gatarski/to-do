'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType, LinkInterface } from './LeftSidebar';
import { SettingTwoTone, AppstoreTwoTone, FileTextTwoTone } from '@ant-design/icons';
import '../styles/global.css';

export const SidebarLink = ({ link, icon, label }: LinkInterface) => {
  const pathname = usePathname();
  const isLinkActive = pathname === link;

  return (
    <Link href={link} className="w-full flex justify-center items-center">
      {getIcon(icon, isLinkActive, label)}
    </Link>
  );
};

const getIcon = (iconName: IconType, isLinkActive: boolean, label: string) => {
  const ICON_SIZE = '38px';
  const NOT_ACTIVE_ICON_COLOR = '#334155';
  const ICON_STYLE = `text-center ${isLinkActive && 'font-medium'} hover:font-bold`;

  switch (iconName) {
    case 'Appstore':
      return (
        <div className={ICON_STYLE}>
          <AppstoreTwoTone
            twoToneColor={!isLinkActive ? NOT_ACTIVE_ICON_COLOR : undefined}
            style={{ fontSize: ICON_SIZE }}
          />
          {label}
        </div>
      );
    case 'Settings':
      return (
        <div className={ICON_STYLE}>
          <SettingTwoTone
            twoToneColor={!isLinkActive ? NOT_ACTIVE_ICON_COLOR : undefined}
            style={{ fontSize: ICON_SIZE }}
          />
          {label}
        </div>
      );
    case 'File':
      return (
        <div className={ICON_STYLE}>
          <FileTextTwoTone
            twoToneColor={!isLinkActive ? NOT_ACTIVE_ICON_COLOR : undefined}
            style={{ fontSize: ICON_SIZE }}
          />
          {label}
        </div>
      );
    default:
      return <></>;
  }
};
