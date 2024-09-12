import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";

import { Label } from "./ui/label";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { Wrapper } from "./ui/wrapper";
import { SubmitButton } from "./ui/submit-btn";
import { Input } from "./ui/input";
import { AttributesButton } from "./ui/attributes-btn";

type Types = "information" | "warning" | "danger" | "idle";
const triggerName = "W";
const toggleName = "infoNode";
const toggleOptions = (type: Types, title: string) => ({
  type,
  title,
});

export const InfoEditorButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isActive = editor.isActive(toggleName);

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<Types>("idle");

  const handleApply = () => {
    if (type === "idle") return;
    if (title === "") return;

    editor.commands.setNode(toggleName, toggleOptions(type, title));
  };

  const handleRemove = () => {
    if (!isActive) return;
    editor.commands.deleteNode(toggleName);
  };

  const updateValues = () => {
    const props = editor.getAttributes(toggleName);

    if (props) {
      const title = props.title || "";
      const type = props.type || "idle";

      setTitle(title);
      setType(type);
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
      <DropdownMenuWrapper className="flex w-64 items-start justify-start overflow-hidden font-mono text-xs">
        <Wrapper className="w-full">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full"
          />
        </Wrapper>
        <Wrapper className="w-full">
          <AttributesButton
            className="w-full"
            name="information"
            index={0}
            onClick={() => setType("information")}
            isActive={type === "information"}
          />
          <AttributesButton
            className="w-full"
            name="warning"
            index={1}
            onClick={() => setType("warning")}
            isActive={type === "warning"}
          />
          <AttributesButton
            className="w-full"
            name="danger"
            index={2}
            onClick={() => setType("danger")}
            isActive={type === "danger"}
          />
        </Wrapper>
        <Wrapper className="w-full flex-row">
          <SubmitButton onClick={handleApply}>Apply</SubmitButton>
          <SubmitButton
            onClick={handleRemove}
            className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300 hover:text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:hover:text-zinc-100"
          >
            Remove
          </SubmitButton>
        </Wrapper>
      </DropdownMenuWrapper>
    </DropdownTrigger>
  );
};
