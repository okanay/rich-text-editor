import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { AttributesButton } from "./ui/attributes-btn";

type Options = { className: string; name: string };
export const headingOptions: Record<number, Options> = {
  0: {
    className:
      "track-item text-[1.8rem] leading-[1.75rem] text-slate-800 dark:text-slate-200",
    name: "H1",
  },
  1: {
    className:
      "text-[1.3em] leading-[1.85rem] -tracking-tight text-slate-500 dark:text-slate-300/70",
    name: "H2",
  },
  2: {
    className:
      "track-item text-[1.3em] leading-[1.75rem] -tracking-tight text-slate-800 dark:text-slate-200",
    name: "H3",
  },
  3: {
    className:
      "track-item text-[1.3em] leading-[1.75rem] -tracking-tight text-slate-800 dark:text-slate-200",
    name: "H4",
  },
  4: {
    className:
      "text-[1.3em] leading-[1.85rem] -tracking-tight text-slate-500 dark:text-slate-300/70",
    name: "H5",
  },
  5: {
    className:
      "text-[0.96rem] font-bold leading-[1.75rem] text-sky-500 dark:text-sky-400",
    name: "H6",
  },
};

const triggerName = "H";
const toggleName = "heading";
const generateKey = (index: number) => `${toggleName}-${index}`;
const toggleOptions = (index: number) => ({
  level: index + 1,
});

export const HeadingEditorButton: React.FC<{ editor: Editor }> = (props) => {
  const isActive = props.editor.isActive(toggleName);

  const onClick = (index: number) => {
    props.editor
      .chain()
      .focus()
      .toggleHeading({ level: (index + 1) as any })
      .run();
  };

  return (
    <DropdownTrigger
      trigger={<TriggerButton isActive={isActive}>{triggerName}</TriggerButton>}
    >
      <DropdownMenuWrapper>
        {Array.from({ length: Object.keys(headingOptions).length }).map(
          (_, index) => (
            <AttributesButton
              name={headingOptions[index].name}
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
