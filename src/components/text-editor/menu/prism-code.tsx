import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";

import { Label } from "./ui/label";
import { TriggerButton } from "./ui/trigger-btn";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { Wrapper } from "./ui/wrapper";
import { SubmitButton } from "./ui/submit-btn";
import { TextArea } from "./ui/textarea";
import { Select } from "./ui/select";

const triggerName = "C";
const toggleName = "codeNode";

const languages = [
  "markup",
  "jsx",
  "tsx",
  "swift",
  "kotlin",
  "objectivec",
  "js-extras",
  "reason",
  "rust",
  "graphql",
  "yaml",
  "go",
  "cpp",
  "markdown",
  "python",
  "json",
];

export const CodeEditorButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isActive = editor.isActive("codeNode");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [lang, setLang] = useState("markup");

  const handleApply = () => {
    const code = textAreaRef.current?.value;
    if (!code) return;
    editor.chain().focus().setNode("codeNode", { code, language: lang }).run();
  };

  const handleRemove = () => {
    if (!isActive) return;

    editor.commands.deleteNode("codeNode");
  };

  const updateValues = () => {
    const props = editor.getAttributes(toggleName);

    if (props) {
      textAreaRef.current!.value = props.code || "";
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
          <Label>Language</Label>
          <Select
            onChange={(e) => {
              setLang(e.target.value);
            }}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="code-input">Code</Label>
          <TextArea
            ref={textAreaRef}
            id="code-input"
            defaultValue={"Enter your code here."}
            className="min-h-40 min-w-96"
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
