// hooks
import { useEditor } from "@tiptap/react";

import { useEffect } from "react";
// External Imports
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import AutoJoiner from "tiptap-extension-auto-joiner"; // optional
// Internal Imports
import { getSavedContent } from "./auto-save";
import { useGetTheme } from "@/hooks/useGetTheme";
import { CustomHeading } from "./extensions/heading";
import { CustomLink } from "./extensions/link";

import { FontSizeMark } from "./extensions/font-size-mark";
import { FontFamilyMark } from "./extensions/font-family-mark";
import { FontWeightMark } from "./extensions/font-weight-mark";
import { LeadingMark } from "./extensions/leading-mark";
import { LetterSpacingMark } from "./extensions/letter-spacing-mark";
import { TextDecorationMark } from "./extensions/text-decoration-mark";
import { CodeNode } from "./extensions/code-node";
import { ImageNode } from "./extensions/image-node";
import { InfoNode } from "./extensions/info-node";
// Constants
export const c = {
  AUTO_SAVE_LOCAL_STORAGE_KEY: "tiptap-auto-save",
  AUTO_SAVE_INTERVAL: 1000,
};

// Editor Configuration Hook
export const useEditorConfig = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, bold: false }),
      GlobalDragHandle.configure({
        dragHandleWidth: 40, // default 20
        scrollTreshold: 0, // default 100
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ImageNode,
      CustomLink,
      CustomHeading,
      FontSizeMark,
      FontFamilyMark,
      FontWeightMark,
      LeadingMark,
      LetterSpacingMark,
      TextDecorationMark,
      CodeNode,
      InfoNode,
    ],
    immediatelyRender: false,
    content: getSavedContent(),
    editorProps: {
      attributes: {
        class: "focus:outline-none focus:shadow-outline min-h-64",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  const { theme } = useGetTheme();

  useEffect(() => {
    if (editor) {
      const content = editor.getHTML();
      editor.commands.setContent("loading...");
      process.nextTick(() => {
        editor.commands.setContent(content);
      });
    }
  }, [theme]);

  return editor;
};
