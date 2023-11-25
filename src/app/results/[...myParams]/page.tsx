import Gallery from "@/components/Gallery";
import React from "react";

type Props = {
  params: {
    myParams: (string | undefined)[];
  };
};

export function generateMetadata({ params: { myParams } }: Props) {
const topic = myParams?.[0] ?? "curated"
const page = myParams?.[1] ?? "1"

  return {
    title: `Results for ${topic}`,
  };
}

export default function searchResults({ params: { myParams } }: Props) {
  const topic = myParams?.[0] ?? "curated"
  const page = myParams?.[1] ?? "1"

  return <Gallery topic={topic} page={page} />;
}
