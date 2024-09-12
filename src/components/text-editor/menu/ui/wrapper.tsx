import { ComponentProps, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  isActive?: boolean;
  children: ReactNode;
}

export const Wrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <div
        className={twMerge("flex flex-col items-start gap-2", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
