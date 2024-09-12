import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const letterSpacingOptions: Record<number, Options> = {
  0: {
    className: "tracking-tighter",
    name: "tighter",
  },
  1: {
    className: "tracking-tight",
    name: "tight",
  },
  2: {
    className: "tracking-normal",
    name: "normal",
  },
  3: {
    className: "tracking-wide",
    name: "wide",
  },
  4: {
    className: "tracking-wider",
    name: "wider",
  },
  5: {
    className: "tracking-widest",
    name: "widest",
  },
};

const triggerName = "LS";
const toggleName = "letterSpacing";
const toggleOptions = (index: number) => ({
  spacing: letterSpacingOptions[index].name,
  index: index,
});
const generateKey = (index: number) => `${toggleName}-${index}`;

export const LetterSpacingEditorButton: React.FC<{ editor: Editor }> = (
  props,
) => {
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
        {Array.from({ length: Object.keys(letterSpacingOptions).length }).map(
          (_, index) => (
            <AttributesButton
              className={`${letterSpacingOptions[index].className}`}
              name={letterSpacingOptions[index].name}
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
