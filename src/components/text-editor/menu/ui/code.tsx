"use client";

import { useGetTheme } from "@/hooks/useGetTheme";
import { Highlight, themes } from "prism-react-renderer";

type TProps = React.FC<{
  code: string;
  language?: "plaintext" | "tsx";
}>;

export const CodeBlock: TProps = ({ code, language = "tsx" }) => {
  const { theme } = useGetTheme();

  if (!theme) return;

  return (
    <div className={"relative"} contentEditable={false}>
      <Highlight
        theme={theme === "light" ? themes.oneLight : themes.oneDark}
        code={code}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className={
              "border-default-950/10 shadow-default-950/10 rounded py-4 text-[0.8rem] shadow"
            }
          >
            <div className={"overflow-x-auto px-6"}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
};
