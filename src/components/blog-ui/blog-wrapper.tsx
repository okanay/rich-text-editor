import { twMerge } from "tailwind-merge";

export const BlogWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  return (
    <article
      className={twMerge(
        "prose relative min-h-64 w-full max-w-4xl px-4 py-2",
        props.className,
      )}
    >
      {props.children}
    </article>
  );
};
