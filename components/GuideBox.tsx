'use client';
import { InfoCircleTwoTone } from '@ant-design/icons';

interface GuidePanelProps {
  guideText: string;
}

export const GuideBox = ({ guideText }: GuidePanelProps) => {
  return (
    <div className="flex flex-row w-full p-3 my-5 bg-[#F0F5FF] border border-[#B3C0FA] rounded-xl text=[#323232] items-start">
      <>
        <InfoCircleTwoTone style={{ fontSize: '18px', paddingRight: '8px', paddingTop: '4px' }} />
        <div>{guideText}</div>
      </>
    </div>
  );
};
