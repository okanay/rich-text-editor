import { useImages } from "@/hooks/useImages";
import { DialogTypes } from "../../image";
import { DialogWrapper } from "../dialog-wrapper";
import { ImageGalleryError } from "./gallery-error";
import { ImageGalleryLoading } from "./gallery-loading";
import { ImagesGallery } from "./gallery-success";

type GalleryDialogProps = {
  setDialogType: (val: DialogTypes) => void;
  addImage: (src: string, alt: string) => void;
};

export const GalleryDialog: React.FC<GalleryDialogProps> = ({
  setDialogType,
  addImage,
}) => {
  const { images, imageFetchStatus, handleRefresh } = useImages();
  return (
    <DialogWrapper
      className="max-w-2xl"
      setDialogType={setDialogType}
      title="Insert From Gallery"
      menu={
        <>
          <button
            onClick={() => setDialogType("Upload")}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Upload
          </button>
          <button
            onClick={() => handleRefresh()}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Refresh
          </button>
        </>
      }
    >
      {imageFetchStatus === "loading" ? (
        <ImageGalleryLoading />
      ) : imageFetchStatus === "error" ? (
        <ImageGalleryError handleRefresh={handleRefresh} />
      ) : (
        <ImagesGallery images={images} addImage={addImage} />
      )}
    </DialogWrapper>
  );
};
