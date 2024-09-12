import React, { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { Wrapper } from "./ui/wrapper";
import { SubmitButton } from "./ui/submit-btn";

type Options = { className: string; name: string };
export const linkOptions: Record<number, Options> = {
  0: {
    className: "w-fit h-fit px-2 py-1 bg-red-400 rounded",
    name: "add-style",
  },
  1: {
    className: "",
    name: "no-style",
  },
};

const triggerName = "A";
const toggleName = "link";

export const LinkEditorButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const targetModeCheckboxRef = useRef<HTMLInputElement>(null);
  const withoutStyleCheckboxRef = useRef<HTMLInputElement>(null);
  const hrefInputRef = useRef<HTMLInputElement>(null);

  const isActive = editor.isActive(toggleName);

  const applyHandler = () => {
    const linkValue = hrefInputRef.current?.value || "";
    const targetValue = targetModeCheckboxRef.current?.checked ? "_blank" : "";
    const index = withoutStyleCheckboxRef.current?.checked ? 1 : 0;

    editor
      .chain()
      .focus()
      .extendMarkRange(toggleName)
      .setLink({
        href: linkValue,
        target: targetValue,
        index: index,
      } as any)
      .run();
  };

  const removeHandler = () => {
    if (!editor.isActive(toggleName)) return;
    editor.chain().focus().unsetLink().run();
  };

  const updateValues = () => {
    const props = editor.getAttributes(toggleName);

    if (props) {
      const index = props.index || 0;
      const linkValue = props.href || "";
      const targetValue = props.target || "";

      hrefInputRef.current!.value = linkValue;
      targetModeCheckboxRef.current!.checked = targetValue === "_blank";
      withoutStyleCheckboxRef.current!.checked = index === 1;
    }
  };

  useEffect(() => {
    editor.on("selectionUpdate", updateValues);

    return () => {
      editor.off("selectionUpdate", updateValues);
    };
  }, [editor]);

  return (
    <DropdownTrigger
      trigger={<TriggerButton isActive={isActive}>{triggerName}</TriggerButton>}
    >
      <DropdownMenuWrapper className="flex items-start justify-start font-mono text-xs">
        <Wrapper>
          <Label htmlFor="link-text">Page Url</Label>
          <Input ref={hrefInputRef} id="link-text" />
        </Wrapper>

        <Wrapper className="flex-row">
          <Checkbox ref={targetModeCheckboxRef} id="open-in-new-tab" />
          <Label htmlFor="open-in-new-tab">Open in new tab</Label>
        </Wrapper>

        <Wrapper className="flex-row">
          <Checkbox ref={withoutStyleCheckboxRef} id="remove-style" />
          <Label htmlFor="remove-style">Without Style</Label>
        </Wrapper>

        <Wrapper className="w-full flex-row">
          <SubmitButton onClick={applyHandler}>Apply</SubmitButton>
          <SubmitButton
            onClick={removeHandler}
            className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300 hover:text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:hover:text-zinc-100"
          >
            Remove
          </SubmitButton>
        </Wrapper>
      </DropdownMenuWrapper>
    </DropdownTrigger>
  );
};
