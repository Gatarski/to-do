import InfoIcon from '../../assets/icons/InfoIcon.svg';
import Image from 'next/image';

interface GuidePanelProps {
  guideText: string;
}

export const GuideBox = ({ guideText }: GuidePanelProps) => {
  return (
    <div id="guideBox" className="flex flex-row w-full p-3 my-5 bg-blue-50 border border-indigo-300 rounded-xl items-start">
      <>
        <Image src={InfoIcon} alt="info Icon" className="w-6 h-6 pr-1" />
        <div>{guideText}</div>
      </>
    </div>
  );
};
