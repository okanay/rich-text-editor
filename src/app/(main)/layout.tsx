import { Header } from "@/components/(main)/header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div
      className={
        "h-full min-h-screen bg-zinc-100 text-slate-800 dark:bg-zinc-800 dark:text-slate-100"
      }
    >
      <Header />
      {props.children}
    </div>
  );
}
