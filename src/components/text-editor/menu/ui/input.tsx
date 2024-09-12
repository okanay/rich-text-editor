import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
  isActive?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className={twMerge(
          "w-64 rounded border border-zinc-950/10 p-2 px-2 py-1 text-zinc-900 focus:outline-none dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50",
          className,
        )}
      />
    );
  },
);
