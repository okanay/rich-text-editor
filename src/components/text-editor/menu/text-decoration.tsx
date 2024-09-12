import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { AttributesButton } from "./ui/attributes-btn";
import { Checkbox } from "./ui/checkbox";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { Label } from "./ui/label";
import { SubmitButton } from "./ui/submit-btn";
import { TriggerButton } from "./ui/trigger-btn";
import { Wrapper } from "./ui/wrapper";
import { twMerge } from "tailwind-merge";

type Options = { className: string; name: string };
export const textDecorationOptions: Record<number, Options> = {
  0: {
    className: "overline",
    name: "Overline",
  },
  1: {
    className: "line-through",
    name: "Line-through",
  },
  2: {
    className: "underline underline-offset-4",
    name: "Underline",
  },
};

export const textDecorationStyleOptions: Record<number, Options> = {
  0: {
    className: "decoration-solid",
    name: "Solid",
  },
  1: {
    className: "decoration-dashed",
    name: "Dashed",
  },
  2: {
    className: "decoration-dotted",
    name: "Dotted",
  },
  3: {
    className: "decoration-double",
    name: "Double",
  },
  4: {
    className: "decoration-wavy",
    name: "Wavy",
  },
};

export const textDecorationColorOptions: Record<number, Options> = {
  0: {
    className: "decoration-violet-500 dark:decoration-violet-400",
    name: "bg-violet-500 dark:bg-violet-400",
  },
  1: {
    className: "decoration-rose-500 dark:decoration-rose-400",
    name: "bg-rose-500 dark:bg-rose-400",
  },
  2: {
    className: "decoration-sky-500 dark:decoration-sky-400",
    name: "bg-sky-500 dark:bg-sky-400",
  },
  3: {
    className: "decoration-lime-500 dark:decoration-lime-400",
    name: "bg-lime-500 dark:bg-lime-400",
  },
  4: {
    className: "decoration-amber-500 dark:decoration-amber-400",
    name: "bg-amber-500 dark:bg-amber-400",
  },
  5: {
    className: "decoration-cyan-500 dark:decoration-cyan-400",
    name: "bg-cyan-500 dark:bg-cyan-400",
  },
  6: {
    className: "decoration-emerald-500 dark:decoration-emerald-400",
    name: "bg-emerald-500 dark:bg-emerald-400",
  },
  7: {
    className: "decoration-fuchsia-500 dark:decoration-fuchsia-400",
    name: "bg-fuchsia-500 dark:bg-fuchsia-400",
  },
  8: {
    className: "",
    name: "bg-zinc-900 dark:bg-zinc-100",
  },
};

const triggerName = "TD";
const toggleName = "textDecoration";
const generateKey = (index: number) => `${toggleName}-${index}`;

export const TextDecorationEditorButton: React.FC<{ editor: Editor }> = (
  props,
) => {
  const isActive = props.editor.isActive(toggleName);
  const [decoration, setDecoration] = useState(-1);
  const [decorationStyle, setDecorationStyle] = useState(-1);
  const [decorationColor, setDecorationColor] = useState(-1);

  const handleOnSubmit = () => {
    if (decoration === -1 || decorationStyle === -1 || decorationColor === -1) {
      return;
    }

    props.editor
      .chain()
      .focus()
      .setMark("textDecoration", {
        decorationStyleIndex: decorationStyle,
        decorationColorIndex: decorationColor,
        decorationTypeIndex: decoration,
      })
      .run();
  };

  const updateValues = () => {
    const values = props.editor.getAttributes(toggleName);

    if (values) {
      if (
        values.decorationTypeIndex &&
        values.decorationStyleIndex &&
        values.decorationColorIndex
      ) {
        setDecoration(values.decorationTypeIndex);
        setDecorationStyle(values.decorationStyleIndex);
        setDecorationColor(values.decorationColorIndex);
      }
    }
  };

  useEffect(() => {
    props.editor.on("selectionUpdate", updateValues);

    return () => {
      props.editor.off("selectionUpdate", updateValues);
    };
  }, [props.editor]);

  return (
    <DropdownTrigger
      trigger={<TriggerButton isActive={isActive}>{triggerName}</TriggerButton>}
    >
      <DropdownMenuWrapper className="fle-col flex w-fit gap-4 px-4 py-4">
        <Wrapper className="flex-row">
          {Array.from({
            length: Object.keys(textDecorationColorOptions).length,
          }).map((color, index) => (
            <Wrapper className="flex-row" key={`remove-color-${index}`}>
              <div
                onClick={() => setDecorationColor(index)}
                className={twMerge(
                  `size-5 rounded-full`,
                  textDecorationColorOptions[index].name,
                  decorationColor === index
                    ? "ring-2 ring-zinc-700 ring-offset-2 ring-offset-zinc-200 dark:ring-zinc-200 dark:ring-offset-zinc-700"
                    : "",
                )}
              />
            </Wrapper>
          ))}
        </Wrapper>

        <Wrapper className="flex flex-row items-center justify-center gap-4">
          <Wrapper className="gap-3">
            {Array.from({
              length: Object.keys(textDecorationOptions).length,
            }).map((_, index) => (
              <AttributesButton
                className={`${textDecorationOptions[index].className}`}
                name={textDecorationOptions[index].name}
                index={index}
                key={generateKey(index)}
                onClick={() => setDecoration(index)}
                isActive={decoration === index}
              />
            ))}
          </Wrapper>

          <Wrapper className="items-start">
            {Array.from({
              length: Object.keys(textDecorationStyleOptions).length,
            }).map((_, index) => (
              <Wrapper className="flex-row" key={`remove-style-${index}`}>
                <Checkbox
                  id={`remove-style-${index}`}
                  checked={decorationStyle === index}
                  onChange={() => setDecorationStyle(index)}
                />
                <Label
                  htmlFor={`remove-style-${index}`}
                  className={`underline underline-offset-4 ${textDecorationStyleOptions[index].className}`}
                >
                  {textDecorationStyleOptions[index].name}
                </Label>
              </Wrapper>
            ))}
          </Wrapper>
        </Wrapper>

        <Wrapper className="w-full flex-row">
          <SubmitButton onClick={handleOnSubmit}>Submit</SubmitButton>

          <SubmitButton
            className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300 hover:text-zinc-900"
            onClick={() => {
              props.editor.chain().focus().unsetMark(toggleName).run();
            }}
          >
            Remove
          </SubmitButton>
        </Wrapper>
      </DropdownMenuWrapper>
    </DropdownTrigger>
  );
};
