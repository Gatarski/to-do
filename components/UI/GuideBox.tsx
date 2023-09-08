import InfoIcon from '../../assets/icons/InfoIcon.svg';
import Image from 'next/image';

interface GuidePanelProps {
  guideText: string;
}

export const GuideBox = ({ guideText }: GuidePanelProps) => {
  return (
    <div className="flex flex-row w-full p-3 my-5 bg-[#F0F5FF] border border-[#B3C0FA] rounded-xl text=[#323232] items-start">
      <>
        <Image src={InfoIcon} alt="info Icon" className="w-6 h-6 pr-1" />
        <div>{guideText}</div>
      </>
    </div>
  );
};
