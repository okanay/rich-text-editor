import { Editor } from "@tiptap/react";
import React, { useCallback } from "react";

import { twMerge } from "tailwind-merge";
import { DropdownTrigger } from "./ui/drop-down-trigger";
import { DropdownMenuWrapper } from "./ui/drop-down-wrapper";
import { GalleryDialog } from "./ui/image/gallery-dialog";
import { UploadDialog } from "./ui/image/upload.dialog";
import { TriggerButton } from "./ui/trigger-btn";

const triggerName = "I";
const toggleName = "imageNode";

export type DialogTypes = "Upload" | "Gallery" | "Idle";
export const ImageEditorButton: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isActive = editor.isActive(toggleName);
  const [dialogType, setDialogType] = React.useState<DialogTypes>("Idle");
  const [closeOnSelect, setCloseOnSelect] = React.useState(false);

  const addImage = useCallback(
    (src: string, alt: string) => {
      if (src && src.length > 0 && alt && alt.length > 0) {
        // Add the image to the editor
        editor.chain().focus().setNode(toggleName, { src, alt }).run();
        // After adding the image, set the dialog type to idle
        setDialogType("Idle");
      }
    },
    [editor],
  );

  return (
    <>
      <DropdownTrigger
        closeOnSelect={closeOnSelect}
        setCloseOnSelect={setCloseOnSelect}
        trigger={
          <TriggerButton isActive={isActive}>{triggerName}</TriggerButton>
        }
      >
        <DropdownMenuWrapper className={twMerge(`px-2`)}>
          <button
            className="w-full text-nowrap rounded border border-zinc-950/10 bg-zinc-100 px-4 py-2 tracking-wider transition-opacity duration-300 hover:opacity-75 dark:border-zinc-50/10 dark:bg-zinc-700"
            onClick={() => {
              setCloseOnSelect(true);
              setDialogType("Gallery");
            }}
          >
            Gallery
          </button>
          <button
            className="w-full text-nowrap rounded border border-zinc-950/10 bg-zinc-100 px-4 py-2 tracking-wider transition-opacity duration-300 hover:opacity-75 dark:border-zinc-50/10 dark:bg-zinc-700"
            onClick={() => {
              setCloseOnSelect(true);
              setDialogType("Upload");
            }}
          >
            Upload
          </button>
        </DropdownMenuWrapper>
      </DropdownTrigger>

      {dialogType === "Gallery" && (
        <GalleryDialog setDialogType={setDialogType} addImage={addImage} />
      )}
      {dialogType === "Upload" && (
        <UploadDialog setDialogType={setDialogType} />
      )}
    </>
  );
};
