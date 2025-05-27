/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import Input from "./Input";

interface ISelectProps {
  options: Record<string, any>[];
  selectedOption?: string | number | (string | number)[] | null;
  placeholder?: string;
  onChange?: (selectedOption: any) => void;
  labelKey?: string;
  valueKey?: string;
  direction?: string;
  className?: string;
  withSearch?: boolean;
  inputTagClassname?: string;
  isMulti?: boolean; // New prop for multi-select
}

function getPosition(direction: string) {
  switch (direction) {
    case "top":
      return "bottom-[2.4rem]";
    case "bottom":
      return "top-[2.8rem]";
    default:
      return "top-[3rem]";
  }
}

export default function Select({
  options,
  selectedOption,
  onChange,
  placeholder = "Select",
  labelKey = "label",
  valueKey = "value",
  direction = "bottom",
  className,
  withSearch = false,
  inputTagClassname,
  isMulti = false, // Default to single-select
}: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    selectedOption || (isMulti ? [] : null)
  );
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(selectedOption || (isMulti ? [] : null));
  }, [selectedOption, isMulti]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string | number) => {
    if (isMulti) {
      const newSelected = Array.isArray(selected)
        ? selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
        : [value];
      setSelected(newSelected);
      onChange?.(newSelected);
    } else {
      setSelected(value);
      onChange?.(value);
      setIsOpen(false);
    }
  };

  const filterOptions = options?.filter((opt) =>
    opt[labelKey].toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedLabels = Array.isArray(selected)
    ? selected
        .map(
          (val) => options.find((item) => item[valueKey] === val)?.[labelKey]
        )
        .join(", ")
    : options.find((item) => item[valueKey] === selected)?.[labelKey];

  const showClearIcon = !!searchText.length;

  return (
    <div className="relative w-full">
      <div
        ref={dropdownRef}
        className={`group relative flex h-11 w-full cursor-pointer items-center justify-between border border-gray-300 hover:border-blue-400 ${className}`}
        onClick={toggleDropdown}
      >
        {withSearch ? (
          <div>
            <Input
              type="text"
              placeholder={placeholder}
              className={`w-full border-none ${inputTagClassname} ${
                selected ? "placeholder:text-grey-800  " : ""
              } focus:placeholder:text-grey-400 text-xs `}
              value={searchText}
              onClick={() => {
                setIsOpen(true);
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
        ) : (
          <div>
            <p
              className={`w-full px-2 text-[1rem] text-grey-800 ${
                selected && selectedLabels ? "text-md text-grey-800" : ""
              }`}
            >
              {selectedLabels || placeholder}
            </p>
          </div>
        )}

        {showClearIcon ? (
          <Icon
            name="clear"
            className="absolute right-0 items-center !text-base hover:text-primary-400"
            onClick={() => setSearchText("")}
          />
        ) : (
          <Icon
            name={
              !isOpen ? "expand_more" : withSearch ? "search" : "expand_less"
            }
            className="absolute right-1 !font-thin  items-center group-hover:text-primary-light"
          />
        )}
      </div>

      {isOpen && (
        <ul
          className={`scrollbar absolute z-20 flex max-h-[150px] w-full animate-flip-down flex-col overflow-auto rounded-md border bg-white shadow-lg duration-300 ${getPosition(
            direction
          )} ${className}`}
        >
          {filterOptions && filterOptions.length > 0 ? (
            filterOptions.map((option) => (
              <li
                className={`flex cursor-pointer list-none items-start px-4 py-2.5 text-sm text-grey-800 hover:bg-primary-50 ${
                  Array.isArray(selected) && selected.includes(option[valueKey])
                    ? "bg-primary-50 font-bold"
                    : ""
                }`}
                key={option[valueKey]}
                onClick={() => handleOptionClick(option[valueKey])}
              >
                <div className="flex justify-between items-center w-full">
                  <div>{option[labelKey]}</div>
                  {Array.isArray(selected) &&
                    selected.includes(option[valueKey]) && (
                      <Icon name="check_circle" />
                    )}
                </div>
              </li>
            ))
          ) : (
            <li className="cursor-default px-4 py-2.5 text-sm">
              No options available
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
