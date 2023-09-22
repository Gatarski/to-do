'use client';
import { SearchKeyType } from '@/types/types';
import { useGetCreateQueryParamsUrl } from '@/utils/client-utils';
import { Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Search } = Input;

interface SearchBarProps {
  placeholder: string;
  searchKeyUrl: SearchKeyType;
}
/*
SearchBar create query params in URL with key from searchKeyUrl and value from input.
Query params can be read on page server-component and search value (string) can be 
pass as props to other server components.
Thanks to that we can display filtered list on server-component
*/
export const SearchBar = ({ searchKeyUrl, placeholder }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getCreateQueryParamsUrl = useGetCreateQueryParamsUrl();
  const queryParamsValue = searchParams.get(searchKeyUrl);

  const [value, setValue] = useState(queryParamsValue);

  useEffect(() => {
    setValue(queryParamsValue);
  }, [queryParamsValue]);

  return (
    <Search
      className="mb-5"
      placeholder={placeholder}
      allowClear={false}
      enterButton="Search"
      size="large"
      value={value as string}
      onChange={e => {
        setValue(e.target.value);
      }}
      onSearch={(value: string) => {
        const queryParams = getCreateQueryParamsUrl(searchKeyUrl, value);
        router.push(queryParams);
      }}
    />
  );
};
