import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const leadingOptions: Record<number, Options> = {
  0: {
    className: "leading-relaxed",
    name: "relaxed",
  },
  1: {
    className: "leading-normal ",
    name: "normal",
  },
  2: {
    className: "leading-tight",
    name: "tight",
  },
  3: {
    className: "leading-loose",
    name: "loose",
  },
  4: {
    className: "leading-snug",
    name: "snug",
  },
  5: {
    className: "leading-none",
    name: "none",
  },
  6: {
    className: "leading-3",
    name: "12px",
  },
  7: {
    className: "leading-4",
    name: "16px",
  },
  8: {
    className: "leading-5",
    name: "20px",
  },
  9: {
    className: "leading-6",
    name: "24px",
  },
  10: {
    className: "leading-7",
    name: "28px",
  },
  11: {
    className: "leading-8",
    name: "32px",
  },
  12: {
    className: "leading-9",
    name: "36px",
  },
  13: {
    className: "leading-10",
    name: "40px",
  },
};

const triggerName = "L";
const toggleName = "leading";
const toggleOptions = (index: number) => ({
  leading: leadingOptions[index].name,
  index: index,
});
const generateKey = (index: number) => `${toggleName}-${index}`;

export const LeadingEditorButton: React.FC<{ editor: Editor }> = (props) => {
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
        {Array.from({ length: Object.keys(leadingOptions).length }).map(
          (_, index) => (
            <AttributesButton
              // className={`${leadingOptions[index].className}`}
              name={leadingOptions[index].name}
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
