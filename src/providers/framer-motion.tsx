import { LazyMotion, domAnimation } from "framer-motion";

type Props = React.FC<{ children: React.ReactNode }>;

export const FramerProvider: Props = ({ children }) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};
