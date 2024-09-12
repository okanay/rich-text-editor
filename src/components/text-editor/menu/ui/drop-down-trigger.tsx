import { useClickOutside } from "@/hooks/useClickOutside";
import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  closeOnSelect?: boolean;
  setCloseOnSelect?: (closeOnSelect: boolean) => void;
}

// prettier-ignore
export const DropdownTrigger: React.FC<DropdownMenuProps> = ({ trigger, children, className, closeOnSelect, setCloseOnSelect}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const ref = useClickOutside(handleClose);

  useEffect(() => {
    if (closeOnSelect) {
      setOpen(false);
      setCloseOnSelect?.(false);
    }
  }, [closeOnSelect]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      <div
        className={twMerge(
          "absolute z-20 w-fit rounded bg-zinc-100 py-2 text-sm tracking-wide text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
