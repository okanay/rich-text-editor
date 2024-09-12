export const ImageGalleryLoading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-500 dark:border-zinc-700 dark:border-t-blue-400"></div>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Loading images...
      </p>
    </div>
  );
};
