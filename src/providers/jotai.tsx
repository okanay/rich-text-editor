import { Provider } from "jotai";

type Props = React.FC<{ children: React.ReactNode }>;

export const JotaiProvider: Props = ({ children }) => {
  return <Provider>{children}</Provider>;
};
