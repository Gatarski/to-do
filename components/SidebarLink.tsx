'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType, LinkInterface } from './LeftSidebar';
import {
  SettingOutlined,
  SettingTwoTone,
  AppstoreOutlined,
  AppstoreTwoTone,
  FileTextOutlined,
  FileTextTwoTone,
} from '@ant-design/icons';
import '../styles/global.css';
import { ICON_SIZE } from '@/util/common';

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
  const ICON_STYLE = `text-center ${
    isLinkActive && 'font-medium'
  } transition-transform hover:scale-105`;

  switch (iconName) {
    case 'Appstore':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <AppstoreTwoTone style={{ fontSize: ICON_SIZE }} />
          ) : (
            <AppstoreOutlined style={{ fontSize: ICON_SIZE }} />
          )}
          {label}
        </div>
      );
    case 'Settings':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <SettingTwoTone style={{ fontSize: ICON_SIZE }} />
          ) : (
            <SettingOutlined style={{ fontSize: ICON_SIZE }} />
          )}
          {label}
        </div>
      );
    case 'File':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <FileTextTwoTone style={{ fontSize: ICON_SIZE }} />
          ) : (
            <FileTextOutlined style={{ fontSize: ICON_SIZE }} />
          )}
          {label}
        </div>
      );
    default:
      return <></>;
  }
};
