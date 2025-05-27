/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-white shadow-sm hover:bg-primary hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  asLink?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  padding?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      asLink = false,
      href = "/",
      icon,
      iconPosition = "left",
      padding,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return asLink ? (
      <Link
        to={href}
        className={cn(buttonVariants({ variant, size, className }), padding)}
      >
        {iconPosition === "left" && icon}
        {props.children}
        {iconPosition === "right" && icon}
      </Link>
    ) : (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          padding 
        )}
        ref={ref}
        {...props}
      >
        {iconPosition === "left" && icon}
        {props.children}
        {iconPosition === "right" && icon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
