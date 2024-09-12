import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export const DropdownMenuWrapper: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        "flex w-fit flex-col items-center justify-center gap-2 rounded px-2 py-2",
        "bg-zinc-100 dark:bg-zinc-800",
        "border border-zinc-950/10 dark:border-zinc-50/10",
        "shadow shadow-zinc-950/5 dark:shadow-zinc-50/5",
        className,
      )}
    >
      {children}
    </div>
  );
};
