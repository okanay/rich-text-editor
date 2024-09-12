import { ComponentProps, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"label"> {
  isActive?: boolean;
  children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, Props>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={twMerge("", className)}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  },
);
