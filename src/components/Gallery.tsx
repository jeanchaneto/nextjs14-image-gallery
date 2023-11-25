import fetchImages from "@/lib/fetchImages";
import { ImagesResults } from "@/models/Images";
import React from "react";
import ImageContainer from "./ImageContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPages from "@/lib/getPrevNextPages";
import Pagination from "./Pagination";

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ topic = "curated", page }: Props) {
  let url;
  if (topic === "curated" && page) {
    //Browsing beyond page
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (topic === "curated") {
    //Homepage
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    // First page of search result
    url = `https://api.pexels.com/v1/search?query=${topic}`;
  } else {
    //search results beyong first page
    url = `https://api.pexels.com/v1/search?query=${topic}?page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No images found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);

  //calculate pagination
  const {prevPage, nextPage} = getPrevNextPages(images);

const footerProps = {topic, page, nextPage, prevPage };

  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px] ">
        {photosWithBlur.map((photo) => (
          <ImageContainer photo={photo} key={photo.id} />
        ))}
      </section>
      <Pagination {...footerProps}/>
    </>
  );
}
