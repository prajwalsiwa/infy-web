/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import Icon from "./Icon";
import { cn } from "@/lib/utils";

interface IDropdownOptionsProps {
  options: Record<string, any>[];
  data: Record<string, any>;
  style?: Record<string, any>;
  sideOffset?: number;
  page?: number;
  className?: string;
  disabled?: boolean;
  isIcon?: boolean;
  trigger?: string;
}

export default function DropdownOptions({
  options,
  data,
  style = { transform: "translateX(-60%)" },
  sideOffset,
  page,
  className,
  disabled = false,
  isIcon = true,
  trigger,
}: IDropdownOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title="Menu"
        className={`group flex items-center rounded p-0.5  ${
          trigger ? "hover:bg-primary" : "hover:bg-[#F5F5F5] data-[state=open]:bg-[#F5F5F5]"
        }`}
        disabled={disabled}
      >
        {/* <span className="material-icons group-hover:text-grey-600 ">more_vert</span> */}
        {isIcon ? (
          <Icon
            name="more_vert"
            className={cn(
              "text-2xl font-light leading-[1.5rem] text-gray-800 ",
              className
            )}
          />
        ) : (
          <div>{trigger}</div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={style}
        sideOffset={sideOffset}
        className="!border"
      >
        <div className="divide-y-2">
          {options.map((option) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                option.onClick(data, page);
              }}
              key={option.id}
              className={cn("cursor-pointer")}
            >
              <div className="flex !h-3 cursor-pointer items-center gap-x-2 text-gray-800">
                {option.icon ? (
                  <Icon
                    name={option.icon}
                    className={`${
                      option.icon === "delete" ? "text-red-500" : null
                    }`}
                  />
                ) : null}
                {option.name}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
