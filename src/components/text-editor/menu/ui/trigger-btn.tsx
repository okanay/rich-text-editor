import { ComponentProps, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  isActive?: boolean;
  children: ReactNode;
}

export const TriggerButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, isActive, className, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          "size-8 rounded border py-1 shadow shadow-zinc-950/10 dark:shadow-zinc-50/10",
          "border border-zinc-950/10 dark:border-zinc-50/10",
          isActive
            ? "border-zinc-50 bg-zinc-700 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
            : "border-zinc-950/10 bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
