import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const fontFamilyOptions: Record<number, Options> = {
  0: {
    className: "font-mono",
    name: "Monospace",
  },
  1: {
    className: "font-sans",
    name: "Sans Serif",
  },
  2: {
    className: "font-serif",
    name: "Serif",
  },
};

const triggerName = "FT";
const toggleName = "fontFamily";
const toggleOptions = (index: number) => ({
  family: fontFamilyOptions[index].name,
  index: index,
});
const generateKey = (index: number) => `${toggleName}-${index}`;

export const FontFamilyEditorButton: React.FC<{ editor: Editor }> = (props) => {
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
        {Array.from({ length: Object.keys(fontFamilyOptions).length }).map(
          (_, index) => (
            <AttributesButton
              className={`${fontFamilyOptions[index].className}`}
              name={fontFamilyOptions[index].name}
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
