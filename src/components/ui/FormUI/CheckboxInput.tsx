"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { nanoid } from "@reduxjs/toolkit";

interface CheckboxWithLabelProps {
  className?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ label, checked, onChange, className, ...props }, ref) => {
  const checkboxId = nanoid();

  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          "peer h-[1rem] w-[1rem] shrink-0 bg-white rounded-sm border-[1.9px] border-gray ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-light data-[state=checked]:text-primary-foreground",
          className
        )}
        id={checkboxId}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check
            className="h-[0.9rem] ml-[1px] w-[0.9rem] text-primary"
            style={{ strokeWidth: 3 }}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        htmlFor={checkboxId}
        className={`text-sm cursor-pointer text-[#3B3939] ${className}`}
      >
        {label}
      </label>
    </div>
  );
});

CheckboxWithLabel.displayName = "CheckboxWithLabel";

export default CheckboxWithLabel;
