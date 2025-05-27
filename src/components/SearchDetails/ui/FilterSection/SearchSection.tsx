"use client";

import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNameSuggestionsQuery } from "@/redux/services/homeApi";

interface SearchSectionProps {
  title: string;
}

function SearchSection({ title }: SearchSectionProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [debouncedInput, setDebouncedInput] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, isLoading } = useNameSuggestionsQuery(debouncedInput, {
    skip: debouncedInput.length < 2,
  });

  const hotelData = data?.hotelData || [];
  const locationData = data?.locationData || [];

  const suggestions = [
    ...hotelData.map((hotel) => ({
      label: `${hotel.name}, ${hotel.location.city}`,
      value: `${hotel.name}, ${hotel.location.city}`,
      city: hotel.location.city,
    })),
    ...locationData.map((loc) => ({
      label: `${loc.name}, ${loc.location.city}`,
      value: `${loc.name}, ${loc.location.city}`,
      city: loc.location.city,
    })),
  ];

  const handleSelect = (item: (typeof suggestions)[number]) => {
    setSelectedValue(item.value);
    setInputValue(item.value);
    setOpen(false);

    // Update search params
    searchParams.set("city", item.city);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="search"
        className="font-medium text-base leading-[24.4px]"
      >
        {title}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="border rounded-lg w-full py-2 px-2 flex items-center gap-2 cursor-pointer border-[#90989A] bg-white"
            onClick={() => setOpen(!open)}
          >
            <MdLocationOn className="text-gray-500" />
            <span className="text-sm text-gray-800">
              {selectedValue || "Where are you going?"}
            </span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[20rem] p-0">
          <Command>
            <CommandInput
              placeholder="Search location..."
              value={inputValue}
              onValueChange={(val) => setInputValue(val)}
            />
            <CommandList>
              {isLoading && <p className="px-3 py-2 text-sm">Loading...</p>}
              <CommandEmpty>No suggestions found.</CommandEmpty>

              <CommandGroup>
                {suggestions.map((item, idx) => (
                  <CommandItem
                    key={idx}
                    value={item.value}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchSection;
