import { EventStatus } from '@/utils/common';

type TagTypes = EventStatus | 'major' | 'minor';

export const Tag = ({ tagType }: { tagType: TagTypes }): JSX.Element => {
  const tagStyle = getStyleForTag(tagType);

  return <span className={tagStyle}>{tagType}</span>;
};

const getStyleForTag = (tagType: TagTypes): string => {
  const commonTagStyle =
    'h-8 inline-block px-2 py-1 border border-gray-300 rounded text-white text-sm font-bold';

  switch (tagType) {
    case 'pending':
      return `${commonTagStyle} bg-[#F6BE00]`;
    case 'closed':
      return `${commonTagStyle} bg-[#6D6F70]`;
    case 'tasks done':
      return `${commonTagStyle} bg-[#228B22]`;
    case 'major':
      return `${commonTagStyle} bg-[#FF5C5C]`;
    case 'minor':
      return `${commonTagStyle} bg-[#99CCFF]`;
  }
};
