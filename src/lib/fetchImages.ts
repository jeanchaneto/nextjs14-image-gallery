import { ImagesSchemaWithPhotos, type ImagesResults } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!response.ok) throw new Error("Fetch failed\n");
    const imagesResults: ImagesResults = await response.json();
    //parse data with Zod Schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);
    if (parsedData.total_results === 0) return undefined;
    return parsedData;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
}
