import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

type ImageGalleryErrorProps = {
  handleRefresh: () => void;
};

export const ImageGalleryError = ({
  handleRefresh,
}: ImageGalleryErrorProps) => {
  return (
    <div className="flex h-96 flex-col items-center justify-center space-y-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Failed to load images
      </p>
      <button
        onClick={handleRefresh}
        className="inline-flex items-center space-x-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Retry</span>
      </button>
    </div>
  );
};
