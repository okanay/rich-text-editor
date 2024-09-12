import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  index: number;
  name: string;
  isActive: boolean;
}

export const AttributesButton = forwardRef<HTMLButtonElement, Props>(
  ({ isActive, className, name, index, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={twMerge(
          // Base styles
          "w-fit text-nowrap rounded-md px-2 py-1 font-mono text-xs transition-all",
          // Background styles
          "bg-zinc-100 dark:bg-zinc-700",
          // Text styles
          "text-zinc-900 dark:text-zinc-100",
          // Border styles
          "border border-zinc-950/10 dark:border-zinc-50/10",
          // Hover styles
          "hover:scale-95 hover:opacity-75",
          // Active styles
          isActive &&
            "border-zinc-50 bg-zinc-700 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900",
          // Custom className
          className,
        )}
      >
        {name}
      </button>
    );
  },
);
