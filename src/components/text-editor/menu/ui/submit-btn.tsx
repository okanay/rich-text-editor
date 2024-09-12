import { ComponentProps, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  isActive?: boolean;
  children: ReactNode;
}

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          "w-full rounded bg-blue-500 py-2 font-mono text-xs text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500",
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
