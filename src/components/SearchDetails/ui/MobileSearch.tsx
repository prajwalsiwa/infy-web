import { Check } from "lucide-react";
import {
  MdLocationOn,
  MdDateRange,
  MdOutlinePerson,
  MdOutlineAdd,
  MdOutlineRemove,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { useState, useRef, useMemo } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
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
import { Calendar } from "@/components/ui/calendar";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import Icon from "@/components/ui/Icon";

interface CheckInOutPickerPropsTypes {
  className?: string;
  showLabel?: boolean;
  onChange?: (dateRange: DateRange) => void;
  initialDateRange?: DateRange | null;
}

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

function MobileSearch({
  className,
  showLabel = false,
  onChange,
  initialDateRange = null,
}: CheckInOutPickerPropsTypes) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange || { from: new Date(), to: addDays(new Date(), 20) }
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const buttonRef = useRef<HTMLDivElement>(null);

  useOutsideClick(buttonRef, () => setDropdownOpen(false));

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDateRange(selectedDate);
    onChange?.(selectedDate || { from: new Date(), to: new Date() });
  };

  const totalGuests = useMemo(() => {
    const { adults, children, infants } = guestCounts;
    const total = adults + children + infants;
    if (showLabel) {
      return `${adults} Adults, ${children} Children, ${infants} Infants`;
    }
    return total > 0 ? `${total} Guests` : "Add Guests";
  }, [guestCounts, showLabel]);

  const updateGuestCount = (
    type: keyof typeof guestCounts,
    operation: "add" | "subtract"
  ) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]:
        operation === "add" ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  return (
    <div className={cn("w-full  border rounded-sm py-1 px-1 mt-2 ", className)}>
        <div className="flex items-center gap-2">
            <div>
                <Icon name="arrow_back" className="text-gray-dark" />
            </div>

      <div className="flex flex-col gap-1">
        <div className="">
          {/* Location Picker */}
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <button className={cn("w-full flex items-center px-2  rounded")}>
                <MdLocationOn className="text-gray mr-2" />
                <span className="text-gray">
                  {locationValue || "Where are you going?"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandList>
                  <CommandEmpty>No locations found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        onSelect={() => {
                          setLocationValue(framework.label);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", {
                            hidden: locationValue !== framework.label,
                          })}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex  w-fit  ">
          {/* Date Picker */}
          <div className="w-64">
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full flex items-center px-2  ">
                  <MdDateRange className="text-gray mr-2" />
                  <span className="text-gray">
                    {dateRange?.from && dateRange?.to
                      ? `${format(dateRange.from, "LLL dd")} - ${format(
                          dateRange.to,
                          "LLL dd"
                        )}`
                      : "Pick Dates"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Selector */}
          <div ref={buttonRef} className="relative flex-grow w-full">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center px-2  "
            >
              <MdOutlinePerson className="text-gray mr-2" />
              <span className="text-gray">{totalGuests}</span>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 z-50 mt-1 w-full p-4 bg-white border rounded shadow"
                >
                  {Object.keys(guestCounts).map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="capitalize">{key}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateGuestCount(
                              key as keyof typeof guestCounts,
                              "subtract"
                            )
                          }
                          className="p-1 rounded border bg-gray-100"
                          disabled={
                            guestCounts[key as keyof typeof guestCounts] === 0
                          }
                        >
                          <MdOutlineRemove />
                        </button>
                        <span>
                          {guestCounts[key as keyof typeof guestCounts]}
                        </span>
                        <button
                          onClick={() =>
                            updateGuestCount(
                              key as keyof typeof guestCounts,
                              "add"
                            )
                          }
                          className="p-1 rounded border bg-gray-100"
                        >
                          <MdOutlineAdd />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
}

export default MobileSearch;
