import { ComponentProps, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
  isActive?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, className, ...props }, ref) => {
    return (
      <input
        id={id}
        type="checkbox"
        ref={ref}
        className={twMerge("size-4", className)}
        {...props}
      />
    );
  },
);
