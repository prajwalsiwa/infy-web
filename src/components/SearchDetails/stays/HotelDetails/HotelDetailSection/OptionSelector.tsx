"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface OptionSelectorProps {
  roomLength?: number; // Number of available options
  onChange: (selectedValue: number) => void; // onChange callback to handle selected value
}

export function OptionSelector({
  roomLength = 1,
  onChange,
}: OptionSelectorProps) {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(1);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    onChange(option); // Notify parent about the change
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center border-r-none space-x-2 px-4 py-2 bg-gray-200 rounded-md">
          <span>{selectedOption !== null ? `${selectedOption}` : "0"}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="gap-1 flex flex-col border-black border !min-w-16">
        {Array.from({ length: roomLength }, (_, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleOptionSelect(index + 1)} // Pass the 1-based value
            className="w-full"
          >
            {index + 1}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
