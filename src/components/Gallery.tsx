import fetchImages from "@/lib/fetchImages";
import { ImagesResults } from "@/models/Images";
import React from "react";
import ImageContainer from "./ImageContainer";
import addBlurredDataUrls from "@/lib/getBase64";

type Props = {
  term?: string | undefined;
};

export default async function Gallery({ term }: Props) {
  const url = !term
    ? "https://api.pexels.com/v1/curated"
    : `https://api.pexels.com/v1/search?query=${term}`;
  const images: ImagesResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No images found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);

  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px] ">
      {photosWithBlur.map((photo) => (
        <ImageContainer photo={photo} key={photo.id} />
      ))}
    </section>
  );
}
