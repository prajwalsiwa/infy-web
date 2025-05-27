"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, min = 0, max = 100, ...props }, ref) => {
  // Ensure two thumbs, defaulting to start (min) and end (max)
  const thumbDefaultValue = defaultValue || [min, max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      defaultValue={thumbDefaultValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {/* Render Thumbs */}
      {thumbDefaultValue.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2  disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
