"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { MdDateRange } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CheckInOutPropsTypes {
  className?: string;
  showLabel?: boolean;
}

export default function CheckInOut({
  className,
  showLabel = true,
}: CheckInOutPropsTypes) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className={cn("w-full  rounded-lg", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn("h-[42px] w-full rounded-lg ", className)}
          >
            <div className="bg-white flex items-center px-3 w-full rounded-sm justify-start gap-2">
              <MdDateRange className="size-5 text-gray mt-[2px]" />
              <div className="text-start h-10 items-center flex w-full">
                <p className="text-sm w-full flex items-center mt-1">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {showLabel ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}{" "}
                          </>
                        ) : (
                          <>
                            {format(date.from, "LLL dd")} -{" "}
                            {format(date.to, "LLL dd")}{" "}
                          </>
                        )}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-start text-gray">Check In-Out</span>
                  )}
                </p>
              </div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
