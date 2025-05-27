/* eslint-disable @typescript-eslint/no-unused-expressions */
import clsx from "clsx";
import { InputHTMLAttributes, useMemo, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { cn } from "@/lib/utils";

export interface AmenitiesValue {
  id: number;
  name: string;
}

interface AmenitiesOption {
  id: number;
  category: string;
  amenities: AmenitiesValue[];
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  options?: AmenitiesOption[];
  values: AmenitiesValue[];
  onValuesChange: (val: AmenitiesValue[]) => void;
  label?: string;
  required?: boolean;
  helperText?: string;
  hasError?: boolean;
  disabled?: boolean;
}

export const AmenitiesMultiSelect = ({
  options,
  values: tagValues,
  onValuesChange,
  className,
  label,
  helperText,
  required,
  hasError,
  disabled,
  ...props
}: InputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dropdownOpen, toggleDropdownOpen] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>("");

  useOutsideClick(containerRef, () => {
    toggleDropdownOpen(false);
  });

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      toggleDropdownOpen(false);
    } else if (!dropdownOpen) {
      toggleDropdownOpen(true);
    }

    if (e.key === "Enter") {
      if (tagInput.length && filteredOptions?.length) {
        const copyArr = [...tagValues];
        const firstItem = filteredOptions[0]?.amenities[0];
        if (firstItem && !copyArr.some((el) => el.id === firstItem.id)) {
          copyArr.push(firstItem);
          onValuesChange(copyArr);
          setTagInput("");
        }
      }
    }

    if (e.key === "Backspace" && !tagInput.length && tagValues.length) {
      const copyArr = [...tagValues];
      copyArr.pop();
      onValuesChange(copyArr);
    }
  };

  const handleAmenityClick = (val: AmenitiesValue) => {
    const copyArr = [...tagValues];
    if (!copyArr.some((el) => el.id === val.id)) {
      copyArr.push(val);
      onValuesChange(copyArr);
      setTagInput("");
    }
  };

  const handleRemoveValue = (id: number) => {
    const updatedValues = tagValues.filter((el) => el.id !== id);
    onValuesChange(updatedValues);
  };

  const filteredOptions = useMemo(() => {
    return options
      ?.map((el) => ({
        ...el,
        amenities: el?.amenities?.filter((amenity) =>
          amenity.name.toLowerCase().startsWith(tagInput.toLowerCase())
        ),
      }))
      .filter((el) => el.amenities.length);
  }, [options, tagInput]);

  return (
    <div className={clsx("flex flex-col ", className)}>
      {label && (
        <label
          className={cn("text-gray-dark text-sm", {
            "text-red-500": hasError,
          })}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div
        ref={containerRef}
        className={clsx(
          "inline-flex items-center gap-2  flex-wrap w-full px-2 py-1 border  rounded-md outline-none focus-within:border-mediumGray disabled:bg-cardBorder duration-300",
          {
            "border-red-500 focus:border-red-500": hasError,
            "hover:border-mediumGray": !disabled,
            "bg-cardBorder": disabled,
          }
        )}
        onClick={() => {
          !disabled && toggleDropdownOpen(true);
          !disabled && inputRef.current?.focus();
        }}
      >
        {tagValues?.map((el) => (
          <span
            key={el.id}
            className="inline-flex space-x-1 px-2 py-1 bg-primary-light rounded-md"
          >
            <span className="inline-block pl-1 text-gray-dark text-sm leading-4 break-all">
              {el.name}
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center"
              onClick={() => handleRemoveValue(el.id)}
              aria-label={`Remove ${el.name}`}
            >
              <MdOutlineClose className="text-mediumGray text-lg hover:text-red-500" />
            </button>
          </span>
        ))}
        <div className="relative w-full z-10">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-3 py-1 min-w-24 text-base text-gray-dark font-normal border-none outline-none"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTags}
            disabled={disabled}
            placeholder="Type to add amenities..."
            {...props}
          />
          {dropdownOpen && (
            <div className=" bg-grey-50  top-full left-0 right-0 w-full p-4 border border-cardBorder rounded-md shadow-md  absolute z-50">
              {filteredOptions?.length ? (
                filteredOptions?.map((el) => (
                  <div key={el.id} className="mb-4">
                    <p className="text-gray-dark font-medium">{el.category}</p>
                    <div className="mt-1 flex items-center flex-wrap gap-2">
                      {el.amenities.map((amenity) => (
                        <button
                          key={amenity.id}
                          className={clsx(
                            "inline-block px-3 py-2 text-gray-dark  bg-cardBorder bg-grey-300 rounded-md text-xs font-medium whitespace-nowrap duration-300",
                            {
                              "bg-sky-200": tagValues.some(
                                (tv) => tv.id === amenity.id
                              ),
                            }
                          )}
                          type="button"
                          onClick={() => handleAmenityClick(amenity)}
                        >
                          {amenity.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-mediumGray font-medium">
                  No matching results found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {helperText && (
        <span className={clsx("text-xs", { "text-red-500": hasError })}>
          {helperText}
        </span>
      )}
    </div>
  );
};
