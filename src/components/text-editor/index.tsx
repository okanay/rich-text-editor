"use client";

import { EditorContent } from "@tiptap/react";
import { BlogWrapper } from "../blog-ui/blog-wrapper";
import { AutoSave } from "./auto-save";
import { useEditorConfig } from "./config";
import { EditorMenu } from "./menu";
import { TipTapNode } from "@troop.com/tiptap-react-render";
import { RenderPost } from "./render";

export default function TextEditor() {
  const editor = useEditorConfig();
  if (!editor) return null;

  return (
    <div className="py-4">
      <div className="mx-auto flex max-w-4xl flex-col rounded-lg border border-zinc-950/10 dark:border-zinc-50/20">
        <EditorMenu editor={editor} />
        <BlogWrapper>
          <EditorContent editor={editor} />
        </BlogWrapper>
        <AutoSave editor={editor} />
      </div>
      <BlogWrapper className="mx-auto">
        <RenderPost data={editor.getJSON() as TipTapNode} />
      </BlogWrapper>
    </div>
  );
}
