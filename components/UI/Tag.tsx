import { EventStatus } from '@/types/types';

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
      return `${commonTagStyle} bg-amber-400`;
    case 'closed':
      return `${commonTagStyle} bg-neutral-500`;
    case 'tasks done':
      return `${commonTagStyle} bg-green-700`;
    case 'major':
      return `${commonTagStyle} bg-red-500`;
    case 'minor':
      return `${commonTagStyle} bg-blue-300`;
  }
};
