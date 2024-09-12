import { Editor } from "@tiptap/react";
import { TriggerButton } from "./ui/trigger-btn";

export const ItalicEditorButton: React.FC<{ editor: Editor }> = (props) => {
  const isActive = props.editor.isActive("italic");

  const onClick = () => {
    props.editor.chain().focus().toggleItalic().run();
  };

  return (
    <TriggerButton isActive={isActive} onClick={onClick}>
      I
    </TriggerButton>
  );
};
