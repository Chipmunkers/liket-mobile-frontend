"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ButtonBase } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CrossIcon from "@/shared/icon/common/cross/DefaultCrossIcon.svg";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { colors } from "@/shared/style/color";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imgPath = searchParams.get("path") || "";
  const selectImgIndex = isNaN(Number(searchParams.get("select") || 0))
    ? 0
    : Number(searchParams.get("select") || 0);

  return (
    <>
      <div className="flex items-center h-[100vh] w-[100%] bg-grey-black">
        <ButtonBase
          disableRipple
          className="icon-button absolute top-[12px] left-[12px] w-[24px] h-[24px] flex justify-center items-center"
          onClick={() => {
            stackRouterBack(router);
          }}
        >
          <CrossIcon fill={colors.grey.white} />
        </ButtonBase>
        <Carousel
          className="w-[100%]"
          dynamicHeight={true}
          infiniteLoop={false}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          emulateTouch={true}
          swipeScrollTolerance={10}
          preventMovementUntilSwipeScrollTolerance={true}
          selectedItem={selectImgIndex}
        >
          {searchParams.getAll("path").map((path, i) => (
            <div
              key={`carousel-img-${i}`}
              className="relative w-[100%] h-[calc(100vh-120px)]"
            >
              <Image
                className="select-none"
                src={process.env.NEXT_PUBLIC_IMAGE_SERVER + path}
                alt="이미지"
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
