import { Editor } from "@tiptap/react";
import { useCallback, useEffect } from "react";
import { c } from "./config";

export const AutoSave: React.FC<{ editor: Editor }> = ({ editor }) => {
  const saveContentCallback = useCallback(() => {
    saveContent(editor.getHTML());
  }, [editor]);

  useEffect(() => {
    const interval = setInterval(saveContentCallback, c.AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [saveContentCallback]);

  return null;
};

export const saveContent = (content: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(c.AUTO_SAVE_LOCAL_STORAGE_KEY, content);
  }
};

export const getSavedContent = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(c.AUTO_SAVE_LOCAL_STORAGE_KEY) || "";
  }
  return "";
};
