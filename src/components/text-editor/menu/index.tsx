import { Editor } from "@tiptap/react";
import { ItalicEditorButton } from "./italic";
import { HeadingEditorButton } from "./heading";
import { LinkEditorButton } from "./link";
import { FontFamilyEditorButton } from "./font-family";
import { FontSizeEditorButton } from "./font-size";
import { FontWeightEditorButton } from "./font-weight";
import { LeadingEditorButton } from "./leading";
import { LetterSpacingEditorButton } from "./letter-spacing";
import { TextAlignEditorButton } from "./text-align";
import { TextDecorationEditorButton } from "./text-decoration";
import { CodeEditorButton } from "./prism-code";
import { ImageEditorButton } from "./image";

export const EditorMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2 border-b border-zinc-950/10 px-4 py-2 dark:border-zinc-50/20">
        <ItalicEditorButton editor={editor} />
        <LinkEditorButton editor={editor} />
        <HeadingEditorButton editor={editor} />
        <CodeEditorButton editor={editor} />
        <ImageEditorButton editor={editor} />
      </div>
      <div className="flex flex-wrap gap-2 border-b border-zinc-950/10 px-4 py-2 dark:border-zinc-50/20">
        <FontFamilyEditorButton editor={editor} />
        <FontWeightEditorButton editor={editor} />
        <FontSizeEditorButton editor={editor} />
        <LeadingEditorButton editor={editor} />
        <LetterSpacingEditorButton editor={editor} />
        <TextDecorationEditorButton editor={editor} />
        <TextAlignEditorButton editor={editor} />
      </div>
    </div>
  );
};
