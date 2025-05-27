/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useMemo, useRef, useState } from "react";
import { MdOutlineAdd, MdOutlineRemove, MdOutlinePerson } from "react-icons/md";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GuestNumberInputValues = {
  adults: number;
  children: number;
  infants: number;
};

interface Props {
  values: GuestNumberInputValues;
  onChange?: (val: GuestNumberInputValues) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
  showLabel?: boolean;
  className?: string;
}

const GuestPicker = ({
  label,
  required,
  hasError,
  helperText,
  values: inputValues,
  onChange,
  disabled,
  showLabel = true,
  className,
}: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const [dropdownOpen, toggleDropdownOpen] = useState<boolean>(false);

  const totalGuests = useMemo(() => {
    // const guests = [
    //   { label: "Adults", value: inputValues.adults },
    //   { label: "Children", value: inputValues.children },
    //   { label: "Infants", value: inputValues.infants },
    // ]
    //   .filter((el) => el.value)
    //   .map((el) => `${el.value} ${el.label}`)
    //   .join(", ");

    

    const totalGuests = [
      { label: "Adults", value: inputValues.adults },
      { label: "Children", value: inputValues.children },
      { label: "Infants", value: inputValues.infants },
    ].reduce((sum, current) => sum + current.value, 0);

    return totalGuests || `Guests`;
  }, [inputValues.adults, inputValues.children, inputValues.infants]);

  useOutsideClick(buttonRef, () => {
    toggleDropdownOpen(false);
  });

  const handleValueUpdate = ({
    field,
    operation,
  }: {
    field: keyof GuestNumberInputValues;
    operation: "add" | "subtract";
  }) => {
    const copyData = { ...inputValues };
    if (operation === "add") {
      onChange && onChange({ ...copyData, [field]: copyData[field] + 1 });
    }
    if (operation === "subtract") {
      onChange && onChange({ ...copyData, [field]: copyData[field] - 1 });
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full h-[42px] ">
      {label && (
        <label
          className={cn("text-darkGray text-base", {
            "text-red-500": hasError,
          })}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div ref={buttonRef} className="relative  h-full">
        <button
          className={cn(
            "w-full h-full bg-white border-none px-3 py-2 flex items-center justify-start text-base text-darkGray font-normal border enabled:hover:border-mediumGray rounded-md outline-none focus:border-mediumGray disabled:bg-cardBorder duration-300",
            {
              "border-red-500 enabled:hover:border-red-500 focus:border-red-500":
                hasError,
            },
            className
          )}
          type="button"
          onClick={() => toggleDropdownOpen(!dropdownOpen)}
          disabled={disabled}
        >
          <i className="mr-3 inline-flex items-center justify-center text-gray text-2xl">
            <MdOutlinePerson />
          </i>
          <div
            className={`flex flex-col justify-start items-start gap-1   ${
              !showLabel && "w-20"
            }`}
          >
            <span className="text-sm  flex text-gray">
              {totalGuests} {!showLabel && `Guests`}
            </span>
          </div>
        </button>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              className="absolute top-[100%] sm:left-0 right-0 p-6 z-50 border bg-white rounded-md shadow-md translate-y-1 cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-4 min-w-52 w-64">
                <li className="flex items-center justify-between text-darkGray">
                  <span className="text-base">Adults</span>
                  <div className="inline-flex items-center gap-4">
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "adults",
                          operation: "subtract",
                        })
                      }
                      disabled={!inputValues.adults}
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineRemove />
                      </i>
                    </button>
                    <span
                      className={cn(
                        "inline-block min-w-7 text-primary font-medium text-center"
                      )}
                    >
                      {inputValues.adults}
                    </span>
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "adults",
                          operation: "add",
                        })
                      }
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineAdd />
                      </i>
                    </button>
                  </div>
                </li>

                <li className="flex items-center justify-between text-darkGray">
                  <span className="text-base">Children</span>
                  <div className="inline-flex items-center gap-4">
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "children",
                          operation: "subtract",
                        })
                      }
                      disabled={!inputValues.children}
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineRemove />
                      </i>
                    </button>
                    <span
                      className={cn(
                        "inline-block min-w-7 text-primary font-medium text-center"
                      )}
                    >
                      {inputValues.children}
                    </span>
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "children",
                          operation: "add",
                        })
                      }
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineAdd />
                      </i>
                    </button>
                  </div>
                </li>

                <li className="flex items-center justify-between text-darkGray">
                  <span className="text-base">Infants</span>
                  <div className="inline-flex items-center gap-4">
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "infants",
                          operation: "subtract",
                        })
                      }
                      disabled={!inputValues.infants}
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineRemove />
                      </i>
                    </button>
                    <span
                      className={cn(
                        "inline-block min-w-7 text-primary font-medium text-center"
                      )}
                    >
                      {inputValues.infants}
                    </span>
                    <button
                      className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full enabled:hover:bg-primary enabled:hover:text-white disabled:border-primaryFaded disabled:text-primaryFaded duration-300"
                      type="button"
                      onClick={() =>
                        handleValueUpdate({
                          field: "infants",
                          operation: "add",
                        })
                      }
                    >
                      <i
                        className={cn(
                          "inline-flex items-center justify-center "
                        )}
                      >
                        <MdOutlineAdd />
                      </i>
                    </button>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {helperText && (
        <span className={cn("text-xs", { "text-red-500": hasError })}>
          {helperText}
        </span>
      )}
    </div>
  );
};
export default GuestPicker;
