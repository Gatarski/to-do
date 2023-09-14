'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType, LinkInterface } from './LeftSidebar';
import '../styles/global.css';
import EventsBlueIcon from '../assets/icons/EventsBlueIcon.png';
import EventsIcon from '../assets/icons/EventsIcon.png';
import NotesBlueIcon from '../assets/icons/NotesBlueIcon.png';
import NotesIcon from '../assets/icons/NotesIcon.png';
import ProfileBlueIcon from '../assets/icons/ProfileBlueIcon.png';
import ProfileIcon from '../assets/icons/ProfileIcon.png';
import Image from 'next/image';

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
  const ICON_STYLE = `flex flex-col items-center mobile:w-10 ${
    isLinkActive && 'font-medium'
  } transition-transform hover:scale-105`;

  switch (iconName) {
    case 'Events':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <Image src={EventsBlueIcon} alt="Events icon" />
          ) : (
            <Image src={EventsIcon} alt="Events icon" />
          )}
          <label>{label}</label>
        </div>
      );
    case 'Profile':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <Image src={ProfileBlueIcon} alt="Profile icon" />
          ) : (
            <Image src={ProfileIcon} alt="Profile icon" />
          )}
          <label>{label}</label>
        </div>
      );
    case 'Notes':
      return (
        <div className={ICON_STYLE}>
          {isLinkActive ? (
            <Image src={NotesBlueIcon} alt="Notes icon" />
          ) : (
            <Image src={NotesIcon} alt="Notes icon" />
          )}
          <label>{label}</label>
        </div>
      );
    default:
      return <></>;
  }
};
