"use client";

import { Props } from "./types";
import ImgCarousel from "@/shared/ui/ImgCarousel";

const ContentImgCarousel = ({ list }: Props) => {
  return (
    <ImgCarousel imgList={list} onClickImg={() => {}} imgAlt="컨텐츠 이미지" />
  );
};

export default ContentImgCarousel;
