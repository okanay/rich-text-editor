import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const fontWeightOptions: Record<number, Options> = {
  0: {
    className: "font-thin",
    name: "100",
  },
  1: {
    className: "font-extralight",
    name: "200",
  },
  2: {
    className: "font-light",
    name: "300",
  },
  3: {
    className: "font-normal",
    name: "400",
  },
  4: {
    className: "font-medium",
    name: "500",
  },
  5: {
    className: "font-semibold",
    name: "600",
  },
  6: {
    className: "font-bold",
    name: "700",
  },
  7: {
    className: "font-extrabold",
    name: "800",
  },
  8: {
    className: "font-black",
    name: "900",
  },
};

const triggerName = "FW";
const toggleName = "fontWeight";
const toggleOptions = (index: number) => ({
  weight: fontWeightOptions[index].name,
  index: index,
});
const generateKey = (index: number) => `${toggleName}-${index}`;

export const FontWeightEditorButton: React.FC<{ editor: Editor }> = (props) => {
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
        {Array.from({ length: Object.keys(fontWeightOptions).length }).map(
          (_, index) => (
            <AttributesButton
              className={`${fontWeightOptions[index].className}`}
              name={fontWeightOptions[index].name}
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
