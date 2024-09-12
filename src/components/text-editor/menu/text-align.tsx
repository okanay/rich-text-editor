import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { style: string; name: string };
export const textAlignOptions: Record<number, Options> = {
  0: {
    style: "left",
    name: "left",
  },
  1: {
    style: "center",
    name: "center",
  },
  2: {
    style: "right",
    name: "right",
  },
  3: {
    style: "justify",
    name: "justify",
  },
};

const triggerName = "TA";
const generateKey = (index: number) => `textAlign-${index}`;
let checkIsActive = (editor: Editor): boolean => {
  let isActive = false;

  for (let i = 1; i < Object.keys(textAlignOptions).length; i++) {
    if (
      editor.isActive({
        textAlign: textAlignOptions[i].name,
      })
    ) {
      isActive = true;
    }
  }

  return isActive;
};

export const TextAlignEditorButton: React.FC<{ editor: Editor }> = (props) => {
  const isActive = checkIsActive(props.editor);

  const onClick = (index: number) => {
    const style = textAlignOptions[index].style;

    if (props.editor.isActive({ textAlign: style })) {
      props.editor.chain().focus().unsetTextAlign().run();
      return;
    }

    props.editor.chain().focus().setTextAlign(style).run();
  };

  return (
    <DropdownTrigger
      trigger={<TriggerButton isActive={isActive}>{triggerName}</TriggerButton>}
    >
      <DropdownMenuWrapper>
        {Array.from({ length: Object.keys(textAlignOptions).length }).map(
          (_, index) => (
            <AttributesButton
              name={textAlignOptions[index].name}
              index={index}
              key={generateKey(index)}
              onClick={() => onClick(index)}
              isActive={props.editor.isActive({
                textAlign: textAlignOptions[index].style,
              })}
            />
          ),
        )}
      </DropdownMenuWrapper>
    </DropdownTrigger>
  );
};
