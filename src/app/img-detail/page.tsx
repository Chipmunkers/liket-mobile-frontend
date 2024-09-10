"use client";

import { useSearchParams } from "next/navigation";
import DetailImgCarousel from "@/shared/ui/DetailImgCarousel";

export default function Page() {
  const searchParams = useSearchParams();
  const selectImgIndex = isNaN(Number(searchParams.get("select") || 0))
    ? 0
    : Number(searchParams.get("select") || 0);

  return (
    <>
      <DetailImgCarousel
        selectIdx={selectImgIndex}
        imgList={searchParams.getAll("path")}
      />
    </>
  );
}
