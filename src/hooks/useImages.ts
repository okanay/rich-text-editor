import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useFileUpload } from "./useFileUpload";

export type ImageFetchStatus = "idle" | "loading" | "success" | "error";

export type ImageProps = {
  id : number;
  creator: string;
  name: string;
  type: string;
  filename: string;
  description: string;
  size: number;
  created_at: string;
  updated_at: string;
};

const imagesAtom = atom<ImageProps[]>([]);
const imageFetchStatusAtom = atom<ImageFetchStatus>("idle");

export const useImages = () => {
  const [images, setImages] = useAtom(imagesAtom);
  const [imageFetchStatus, setImageFetchStatus] = useAtom(imageFetchStatusAtom);

  useEffect(() => {
    if (imageFetchStatus === "success") return;

    const fetchImagesAsync = async () => {
      setImageFetchStatus("loading");
      const images = await fetchImages();

      if (images.status === "success") {
        setImages(images.images);
        setImageFetchStatus("success");
      }

      else if (images.status === "error") {
        setImageFetchStatus("error");
        setImages([]);
      }
    }

    fetchImagesAsync();
  }, []);

  const handleRefresh = async () => {
    setImageFetchStatus("loading")

    const images = await fetchImages();
    if (images.status === "success") {
      setImages(images.images);
      setImageFetchStatus("success");
    }

    if (images.status === "error") {
      setImageFetchStatus("error");
      setImages([]);
    }
  }

  const handleDeleteRequest = async (filename: string) => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const formData = new FormData();
    formData.append("filename", filename);

    const res = await fetch(`${API_URL}/auth/assets/delete`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (res.ok) {
      handleRefresh();
      setImages(images.filter((image) => image.filename !== filename));
    }
  };

  return { images, imageFetchStatus, handleRefresh, handleDeleteRequest };
}

const fetchImages = async () => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    const res = await fetch(`${API_URL}/assets/all`, {
      method: "GET",
    });

    const data = await res.json();
    return {
      status: "success",
      message: "Images fetched successfully",
      images: data.assets
    }
  } catch (error) {
    return {
      status : "error",
      message: "Failed to fetch images",
      images: []
    }
  }
};
