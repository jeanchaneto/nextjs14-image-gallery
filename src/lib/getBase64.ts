import { ImagesResults, Photo } from "@/models/Images";
import { getPlaiceholder } from "plaiceholder";

async function getBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    const buffer = await response.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
}

export default async function addBlurredDataUrls(
  images: ImagesResults
): Promise<Photo[]> {
  //Parrallels request to avoid waterfall

  const base64Promises = images.photos.map((photo) => getBase64(photo.src.large));

  //resolve all request in order

  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur: Photo[] = images.photos.map((photo, i) => {
    photo.blurredDataUrl = base64Results[i];
    return photo;
  });

  return photosWithBlur
}
