import React from "react";
import { ImageProps, useImages } from "@/hooks/useImages";
import Image from "next/image";
import { XCircle, ImageIcon } from "lucide-react";

type ImageGalleryProps = {
  images: ImageProps[];
  addImage: (src: string, alt: string) => void;
};

export const ImagesGallery = ({ images, addImage }: ImageGalleryProps) => {
  const { handleDeleteRequest } = useImages();

  if (images.length === 0) return <NoImages />;

  return (
    <div className="relative grid h-full grid-cols-2 gap-4 overflow-y-auto p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image, i: number) => (
        <div
          key={"gallery_image" + i}
          className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-zinc-800"
        >
          <button
            className="h-full w-full focus:outline-none"
            onClick={() => {
              addImage(
                handleUrl(image.filename, "original"),
                image.description,
              );
            }}
          >
            <Image
              src={handleUrl(image.filename, "low")}
              loading="lazy"
              alt={image.description}
              unoptimized
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-75"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </button>
          <button
            className="absolute right-2 top-2 z-40 rounded-full bg-white p-1 opacity-0 shadow-md transition-opacity duration-300 ease-in-out hover:bg-red-100 group-hover:opacity-100 dark:bg-zinc-700 dark:hover:bg-red-900"
            onClick={() => handleDeleteRequest(image.filename)}
          >
            <XCircle className="h-5 w-5 text-red-500" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="truncate text-sm text-white">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const NoImages = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
      <ImageIcon className="h-16 w-16 text-zinc-400" />
      <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
        No images found
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">
        Upload some images to see them here
      </p>
    </div>
  );
};

type Quality = "low" | "medium" | "high" | "original";

const handleUrl = (filename: string, quality?: Quality) => {
  if (!filename) return "";
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (quality === "low") {
    return `${API_URL}/assets/${filename}?quality=40`;
  } else if (quality === "medium") {
    return `${API_URL}/assets/${filename}?quality=60`;
  } else if (quality === "high") {
    return `${API_URL}/assets/${filename}?quality=80`;
  }
  return `${API_URL}/assets/${filename}`;
};
