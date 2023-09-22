'use client';
import type { MenuProps } from 'antd';
import { Checkbox, Dropdown } from 'antd';
import { useState } from 'react';
import FilterIcon from '../assets/icons/FilterIcon.png';
import FilterBlueIcon from '../assets/icons/FilterBlueIcon.png';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Button from './UI/Button';
import { useRouter } from 'next/navigation';
import { useGetCreateQueryParamsUrl } from '@/utils/client-utils';
import { SearchKeyType } from '@/types/types';

interface FilterDropdownProps {
  filterDescription: string;
  filterOptions: string[];
  filterKeyUrl: SearchKeyType;
}
/*
FilterDropdown create query params in URL with key from filterKeyUrl and values from dropdown.
Query params can be read on page server-component and filter values (strings) can be passed as props to other server components.
Thanks to that we can display filtered list on server-component
*/
export const FilterDropdown = ({
  filterDescription,
  filterOptions,
  filterKeyUrl,
}: FilterDropdownProps) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const filteredValues = searchParams.getAll(filterKeyUrl);
  const isFilterActive = filteredValues.length;
  const items = useItems(
    setIsOpen,
    isOpen,
    filterOptions,
    filteredValues,
    filterKeyUrl,
    filterDescription,
  );

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
      }}
      open={isOpen}
    >
      <div
        className="mt-1.5 ml-1.5"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isFilterActive ? (
          <Image className="w-8 h-8 cursor-pointer" src={FilterBlueIcon} alt="Filter icon" />
        ) : (
          <Image className="w-8 h-8 cursor-pointer" src={FilterIcon} alt="Filter icon" />
        )}
      </div>
    </Dropdown>
  );
};

const useItems = (
  setIsOpen: Function,
  isOpen: boolean,
  filterOptions: string[],
  appliedFilterValues: string[],
  filterKeyUrl: SearchKeyType,
  filterDescription: string,
) => {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<string[]>(appliedFilterValues);
  const getCreateQueryParamsUrl = useGetCreateQueryParamsUrl();

  if (!isOpen && JSON.stringify(selectedValues) !== JSON.stringify(appliedFilterValues)) {
    setSelectedValues(appliedFilterValues);
  }

  const searchItems = filterOptions.map(name => {
    return {
      label: (
        <div className="flex gap-2">
          <Checkbox checked={selectedValues.includes(name)} />
          {name}
        </div>
      ),
      key: name,
      onClick: (e: { key: string }) => {
        if (selectedValues.includes(e.key)) {
          setSelectedValues(selectedValues.filter(value => value !== e.key));
        } else {
          setSelectedValues(existingValues => [...existingValues, e.key]);
        }
      },
    };
  });

  const items = [
    { label: <p className="font-bold">{filterDescription}</p> },
    ...searchItems,
    { type: 'divider' },
    {
      label: (
        <div className="flex gap-2">
          <Button
            buttonText="Filter"
            type="primary"
            onClick={() => {
              const queryParams = getCreateQueryParamsUrl(filterKeyUrl, selectedValues);
              router.push(queryParams);
              setIsOpen(false);
            }}
          />
          <Button
            buttonText="Clear"
            onClick={() => {
              setSelectedValues([]);
              const queryParams = getCreateQueryParamsUrl(filterKeyUrl, []);
              router.push(queryParams);
              setIsOpen(false);
            }}
          />
        </div>
      ),
    },
  ] as MenuProps['items'];
  return items;
};
