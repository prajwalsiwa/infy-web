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

export const GuestPicker = ({
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
    const guests = [
      { label: "Adults", value: inputValues.adults },
      { label: "Children", value: inputValues.children },
      { label: "Infants", value: inputValues.infants },
    ]
      .filter((el) => el.value)
      .map((el) => `${el.value} ${el.label}`)
      .join(", ");

    const totalGuests = [
      { label: "Adults", value: inputValues.adults },
      { label: "Children", value: inputValues.children },
      { label: "Infants", value: inputValues.infants },
    ].reduce((sum, current) => sum + current.value, 0);

    // eslint-disable-next-line no-constant-binary-expression
    return showLabel ? guests : `${totalGuests} Guests` || `Add Guests`;
  }, [
    inputValues.adults,
    inputValues.children,
    inputValues.infants,
    showLabel,
  ]);

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
    if (onChange) {
      const updatedValue = { ...inputValues };
      if (operation === "add") {
        updatedValue[field] += 1;
      } else if (operation === "subtract" && updatedValue[field] > 0) {
        updatedValue[field] -= 1;
      }
      onChange(updatedValue); // Pass updated value back to parent
    }
  };

  return (
    <div className="flex flex-col gap-1 h-full ">
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
            "w-full h-full border-none px-5 py-3 flex items-start justify-start text-base text-darkGray font-normal border enabled:hover:border-mediumGray rounded-md outline-none focus:border-mediumGray disabled:bg-cardBorder duration-300",
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
          <i className="mr-1 inline-flex items-center justify-center text-gray text-2xl">
            <MdOutlinePerson />
          </i>
          <div
            className={`flex flex-col justify-start items-start ${!showLabel && "w-20"}`}
          >
            {showLabel && (
              <span className="text-gray-dark text-sm font-semibold">
                Guests
              </span>
            )}
            <span className="text-sm text-grey-700 flex">
              {totalGuests} {showLabel && ""}
            </span>
          </div>
        </button>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              className="absolute top-[100%] right-0 p-6 border bg-white rounded-md shadow-md translate-y-1 cursor-default z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-4 min-w-52 w-64">
                {["adults", "children", "infants"].map((field) => (
                  <li className="flex items-center justify-between text-darkGray" key={field}>
                    <span className="text-base capitalize">{field}</span>
                    <div className="inline-flex items-center gap-4">
                      <button
                        className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full"
                        type="button"
                        onClick={() =>
                          handleValueUpdate({
                            field: field as keyof GuestNumberInputValues,
                            operation: "subtract",
                          })
                        }
                        disabled={inputValues[field as keyof GuestNumberInputValues] <= 0}
                      >
                        <MdOutlineRemove />
                      </button>
                      <span className="inline-block min-w-7 text-primary font-medium text-center">
                        {inputValues[field as keyof GuestNumberInputValues]}
                      </span>
                      <button
                        className="inline-flex items-center justify-center p-1 text-primary border border-primary rounded-full"
                        type="button"
                        onClick={() =>
                          handleValueUpdate({
                            field: field as keyof GuestNumberInputValues,
                            operation: "add",
                          })
                        }
                      >
                        <MdOutlineAdd />
                      </button>
                    </div>
                  </li>
                ))}
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
