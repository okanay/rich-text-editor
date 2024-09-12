import { useClickOutside } from "@/hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import { DialogTypes } from "../image";

type DialogProps = {
  children: React.ReactNode;
  className?: string;
  setDialogType: (val: DialogTypes) => void;
  title?: string;
  menu?: React.ReactNode;
};

export const DialogWrapper: React.FC<DialogProps> = ({
  children,
  setDialogType,
  className,
  title,
  menu,
}) => {
  const ref = useClickOutside(() => setDialogType("Idle"));

  return (
    <div className="fixed left-0 top-0 z-40 h-screen min-h-[440px] w-full bg-zinc-700/10 dark:bg-zinc-100/10">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center">
        <div
          ref={ref}
          className={twMerge(
            "z-40 w-[800px] rounded border border-zinc-950/20 bg-zinc-50 pt-4 dark:border-zinc-50/20 dark:bg-zinc-800",
            className,
          )}
        >
          <div className="flex w-full items-center justify-between overflow-y-auto border-b border-zinc-950/10 px-4 pb-4 dark:border-zinc-50/10">
            <h1 className="text-2xl text-zinc-700 dark:text-zinc-200">
              {title || "Dialog"}
            </h1>
            <div className="flex gap-4">
              {menu}
              <button
                className="rounded border border-zinc-950/10 bg-zinc-100 px-2 py-1 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50"
                onClick={() => setDialogType("Idle")}
              >
                X
              </button>
            </div>
          </div>
          <div className="h-[400px] px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
