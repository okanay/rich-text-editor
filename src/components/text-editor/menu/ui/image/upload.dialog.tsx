import React from "react";
import { twMerge } from "tailwind-merge";
import { DialogTypes } from "../../image";
import { DialogWrapper } from "../dialog-wrapper";
import { useFileUpload } from "@/hooks/useFileUpload";
import { XCircle, Upload, Image } from "lucide-react";

type UploadDialogProps = {
  setDialogType: (val: DialogTypes) => void;
};

export const UploadDialog: React.FC<UploadDialogProps> = (props) => {
  const {
    handleFileAdd,
    handleFileRemove,
    startUpload,
    uploading,
    fileInputRef,
    updateFileAttributes,
    files,
    length,
  } = useFileUpload();

  return (
    <DialogWrapper
      className="max-w-2xl"
      setDialogType={props.setDialogType}
      title="Upload Image"
      menu={
        <>
          <button
            onClick={() => props.setDialogType("Gallery")}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Gallery
          </button>
        </>
      }
    >
      <div className="relative h-full overflow-hidden overflow-y-auto">
        <div className="flex h-full w-full flex-col gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Yüklemek için dosya seçin ve daha iyi SEO için alt metin ekleyin.
          </p>
          <div className="flex flex-col gap-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow-md dark:bg-zinc-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {file.file.name}
                  </span>
                  <button
                    onClick={() => handleFileRemove(file)}
                    className="text-zinc-400 transition duration-300 ease-in-out hover:text-red-500"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Alt Metin"
                  value={file.description}
                  onChange={(e) =>
                    updateFileAttributes(file, { description: e.target.value })
                  }
                  className="mb-3 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                />
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      {file.status}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
                      {file.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
                    <div
                      style={{ width: `${file.progress}%` }}
                      className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Image size={20} />
                Dosya Seç
              </button>
              <input
                hidden
                type="file"
                ref={fileInputRef}
                onChange={handleFileAdd}
                multiple
              />
              <button
                onClick={startUpload}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:hover:bg-zinc-400`}
                disabled={length === 0 || uploading}
              >
                <Upload size={20} />
                Yükle
              </button>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};
