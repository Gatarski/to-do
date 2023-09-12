'use client';
import { ItemType } from '@/types/types';
import { Input } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const { Search } = Input;

interface SearchBarProps {
  placeholder: string;
  searchKeyUrl: ItemType;
}
/*
SearchBar create query params in URL with key from searchKeyUrl and value from input.
Query params can be read on page server-component and search value (string) can be 
pass as props to other server components.
Thanks to that we can display filtered list on server-component
*/
export const SearchBar = ({ searchKeyUrl, placeholder }: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // queryParamsValue is default input value which is displayed when query params in active
  const queryParamsValue = searchParams.get(searchKeyUrl);
  return (
    <Search
      className="mb-5"
      placeholder={placeholder}
      allowClear={false}
      enterButton="Search"
      size="large"
      defaultValue={queryParamsValue ? queryParamsValue : undefined}
      onSearch={(value: string) => {
        router.push(value ? `${pathname}?${searchKeyUrl}=${value}` : pathname);
      }}
    />
  );
};
