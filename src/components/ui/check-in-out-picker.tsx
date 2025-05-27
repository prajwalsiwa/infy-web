/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  format, eachDayOfInterval, isSameDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { MdDateRange } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CheckInOutPickerPropsTypes {
  date: any;
  setDate: any;
  className?: string;
  showLabel?: boolean;
  onChange?: (dateRange: DateRange) => void;
  initialDateRange?: DateRange | null;
}

export function CheckInOutPicker({
  date,
  setDate,
  className,
  showLabel = true,
  onChange,
}: CheckInOutPickerPropsTypes) {
 

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate && onChange) {
      onChange(selectedDate);
    }
  };

  // Get the in-between dates (excluding start and end)
  const inRange =
    date?.from && date.to
      ? eachDayOfInterval({ start: date.from, end: date.to }).filter(
          (d) => !isSameDay(d, date.from!) && !isSameDay(d, date.to!)
        )
      : [];


  return (
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn("h-[60px] overflow-hidden px-4 py-2", className)}
          >
            <div className="bg-white flex items-start justify-start gap-2 mt-1">
              <MdDateRange className="size-5 text-gray mt-[2px]" />
              <div className="text-start">
                {showLabel && (
                  <p className="text-gray-dark text-sm font-semibold">
                    Check In - Check Out
                  </p>
                )}
                <p className="!text-[0.84rem] text-gray-dark flex items-center mt-1">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {showLabel ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          <>
                            {format(date.from, "LLL dd")} -{" "}
                            {format(date.to, "LLL dd")}
                          </>
                        )}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-start text-gray-dark">
                      Pick Dates
                    </span>
                  )}
                </p>
              </div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            modifiers={{
              inRange, // highlight in-between dates
            }}
            modifiersClassNames={{
              inRange: "!bg-blue-300 ", // light blue highlight
              selected: "hover:bg-blue-400 bg-blue-400", // start and end
            }}
            classNames={
              {
                // day: "rounded-full", // rounded look for all days
              }
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
