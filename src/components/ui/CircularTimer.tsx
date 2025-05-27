/* eslint-disable prefer-const */
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

interface CircularTimerProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  duration: number; // Total duration of the timer in seconds
}

const CircularTimer = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircularTimerProps
>(({ className, duration, ...props }, ref) => {
  const [progress, setProgress] = React.useState(100);
  const [remainingTime, setRemainingTime] = React.useState(duration);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const startTimeKey = "circularTimerStartTime";
    const savedStartTime = localStorage.getItem(startTimeKey);
    const now = Date.now();

    // If there's a saved start time, calculate elapsed time
    if (savedStartTime) {
      const elapsedTime = (now - parseInt(savedStartTime, 10)) / 1000;
      const timeLeft = Math.max(0, duration - elapsedTime);
      setRemainingTime(timeLeft);
      setProgress((timeLeft / duration) * 100);

      if (timeLeft <= 0) {
        localStorage.removeItem(startTimeKey);

        if (pathname?.includes("search")) {
          navigate(window.location.origin);
        } else {
          localStorage.removeItem(startTimeKey);
          navigate("/"); // Explicit navigation when timer is 0
        }

        return;
      }
    } else {
      // If no saved start time, save the current time
      localStorage.setItem(startTimeKey, now.toString());
    }

    let interval: NodeJS.Timeout;
    const decrementPerTick = (100 / (duration * 1000)) * 50; // Decrement per tick (50ms)

    interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress - decrementPerTick;
        if (nextProgress <= 0) {
          clearInterval(interval);
          localStorage.removeItem(startTimeKey);
          navigate("/"); // Explicit navigation when timer is 0
          return 0;
        }
        return nextProgress;
      });

      setRemainingTime((prevTime) => {
        const nextTime = prevTime - 0.05;
        if (nextTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem(startTimeKey);
          navigate("/"); // Explicit navigation when timer is 0
        }
        return Math.max(0, nextTime);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, navigate, pathname]);

  return (
    <div className="relative flex items-center justify-center">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-[2.625rem] w-[2.625rem] rounded-full bg-gray-200",
          "after:absolute after:inset-[10%] after:rounded-full after:bg-white",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="absolute h-[2.628rem] w-[2.65rem]   rounded-full transition-transform duration-[10ms]"
          style={{
            background: `conic-gradient(#2497eb ${progress}%, #ffff ${progress}%)`,
          }}
        />
      </ProgressPrimitive.Root>
      <span className="absolute text-[0.7rem] font-medium ">
        {`${Math.ceil(remainingTime)}s`}
      </span>
    </div>
  );
});
CircularTimer.displayName = ProgressPrimitive.Root.displayName;

export { CircularTimer };
