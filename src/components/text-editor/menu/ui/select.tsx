import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"select"> {}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref}
        className={twMerge(
          "px-4 py-2 text-center text-zinc-900 focus:outline-none dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50",
          className,
        )}
      >
        {props.children}
      </select>
    );
  },
);
