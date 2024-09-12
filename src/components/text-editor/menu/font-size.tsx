import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const fontSizeOptions: Record<number, Options> = {
  0: {
    className: "text-xs",
    name: "12px",
  },
  1: {
    className: "text-sm",
    name: "14px",
  },
  2: {
    className: "text-base",
    name: "16px",
  },
  3: {
    className: "text-lg",
    name: "18px",
  },
  4: {
    className: "text-xl",
    name: "20px",
  },
  5: {
    className: "text-2xl",
    name: "24px",
  },
  6: {
    className: "text-3xl",
    name: "30px",
  },
  7: {
    className: "text-4xl",
    name: "36px",
  },
  8: {
    className: "text-5xl",
    name: "48px",
  },
  9: {
    className: "text-6xl",
    name: "60px",
  },
  10: {
    className: "text-7xl",
    name: "72px",
  },
  11: {
    className: "text-8xl",
    name: "96px",
  },
};

const triggerName = "FS";
const toggleName = "fontSize";
const toggleOptions = (index: number) => ({
  size: fontSizeOptions[index].name,
  index: index,
});
const generateKey = (index: number) => `${toggleName}-${index}`;

export const FontSizeEditorButton: React.FC<{ editor: Editor }> = (props) => {
  const isActive = props.editor.isActive(toggleName);

  const onClick = (index: number) => {
    props.editor
      .chain()
      .focus()
      .toggleMark(toggleName, { ...toggleOptions(index) })
      .run();
  };

  return (
    <DropdownTrigger
      trigger={<TriggerButton isActive={isActive}>{triggerName}</TriggerButton>}
    >
      <DropdownMenuWrapper>
        {Array.from({ length: Object.keys(fontSizeOptions).length }).map(
          (_, index) => (
            <AttributesButton
              // className={`${fontSizeOptions[index].className}`}
              name={fontSizeOptions[index].name}
              index={index}
              key={generateKey(index)}
              onClick={() => onClick(index)}
              isActive={props.editor.isActive(toggleName, {
                ...toggleOptions(index),
              })}
            />
          ),
        )}
      </DropdownMenuWrapper>
    </DropdownTrigger>
  );
};
