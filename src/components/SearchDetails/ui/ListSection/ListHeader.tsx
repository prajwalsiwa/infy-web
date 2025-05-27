import React from "react";
import Select from "@/components/ui/FormUI/Select"; 

interface ListHeaderProps {
  itemCount?: number; 
  itemType: string;
  sortOptions: Array<{ label: string; value: string }>;
  onSortChange?: (value: string) => void; 
}

const ListHeader: React.FC<ListHeaderProps> = ({
  itemCount,
  itemType,
  sortOptions,
  onSortChange,
}) => {
  return (
    <div className="flex justify-between items-center w-full py-2">
      <span className="font-medium sm:text-lg text-base">
        {itemCount} {itemType} found
      </span>
      <div className="hidden items-center sm:flex">
        <span className="font-light w-20 sm:text-lg text-md">Sort By:</span>
        <div className="flex w-[10rem]">
          <Select
            inputTagClassname="!focus:placeholder:text-black"
            className="border-none"
            options={sortOptions}
            onChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListHeader;
