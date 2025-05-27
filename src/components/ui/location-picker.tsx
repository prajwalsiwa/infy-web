"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { MdLocationOn } from "react-icons/md";

import { cn } from "@/lib/utils";
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
import { useNameSuggestionsQuery } from "@/redux/services/homeApi";

interface LocationPickerProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function LocationPicker({ selectedValue, setSelectedValue }: LocationPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const [debouncedInput, setDebouncedInput] = React.useState("");

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
    })),
    ...locationData.map((loc) => ({
      label: `${loc.name}, ${loc.location.city}`,
      value: `${loc.name}, ${loc.location.city}`,
    })),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn("min-w-[13.75rem] h-[4rem] px-1 py-0.5")}
        >
          <div className="bg-white flex items-start justify-start gap-2">
            <MdLocationOn className="size-5 text-gray mt-[2px]" />
            <div className="text-start">
              <p className="text-gray-dark text-sm font-semibold">Location</p>
              <p className="text-sm text-gray-dark">
                {selectedValue || "Where are you going?"}
              </p>
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
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
                  onSelect={() => {
                    setSelectedValue(item.value);
                    setOpen(false);
                  }}
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
  );
}
