"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import {
  Props,
  PropsWithFallbackComponent,
  PropsWithFallbackImg,
} from "./types";
import { classNames } from "@/shared/helpers/classNames";
import EmptyImgIcon from "./icon/EmptyImgIcon.svg";
import LIKETLogo from "@/shared/icon/common/LIKETBlackLogo.svg";

const DefaultImg = ({
  alt = "",
  className = "",
  srcHost = process.env.NEXT_PUBLIC_IMAGE_SERVER,
  cover = true,
  width = "100%",
  height = "100%",
  select = false,
  src,
  ...props
}: Props) => {
  const [isErrorEmit, setIsErrorTriggered] = useState(false);

  const handleError = () => setIsErrorTriggered(true);

  // 유효하지 않은 경로일 경우 host가 src와 합쳐지게 되고 그럴 경우 허용되지 않은 host라는 에러가 발생함
  if (!src.startsWith("/")) {
    src = "/" + src;
  }

  // * PropsWithFallbackImg
  const fallbackImgSrc: string | undefined = (props as PropsWithFallbackImg)
    .fallbackImgSrc;
  const fallbackImgHost: string | undefined = (props as PropsWithFallbackImg)
    .fallbackImgHost;

  // * PropsWithFallbackComponent
  const fallbackComponent: ReactNode | undefined = (
    props as PropsWithFallbackComponent
  ).fallbackComponent;
  const fallbackComponentBackgroundColor: string | undefined = (
    props as PropsWithFallbackComponent
  ).fallbackComponentBackgroundColor;

  return (
    <div
      className={classNames(className)}
      style={{
        backgroundColor:
          isErrorEmit && fallbackComponent && fallbackComponentBackgroundColor
            ? fallbackComponentBackgroundColor
            : undefined,
        width: width || "100%",
        height: height || "100%",
      }}
    >
      <div className="w-[100%] h-[100%] absolute bg-grey-01 flex justify-center items-center">
        <LIKETLogo
          style={{
            width: "50%",
            opacity: "20%",
          }}
        />
      </div>
      {!isErrorEmit && (
        <Image
          className={classNames(!select ? "select-none" : "")}
          src={srcHost + src}
          onError={handleError}
          alt={alt}
          fill
          style={
            cover
              ? {
                  objectFit: "cover",
                }
              : {}
          }
        />
      )}

      {/* fallbackImgSrc가 있을 경우 */}
      {isErrorEmit && fallbackImgSrc && (
        <Image
          src={
            (fallbackImgHost || process.env.NEXT_PUBLIC_IMAGE_SERVER) +
            fallbackImgSrc
          }
          alt={alt}
          fill
          style={
            cover
              ? {
                  objectFit: "cover",
                }
              : {}
          }
        />
      )}

      {/* fallbackComponent가 있을 경우 */}
      {isErrorEmit && fallbackComponent}

      {/* fallbackComponent와 fallbackImgSrc모두 없을 때 */}
      {isErrorEmit && !fallbackComponent && !fallbackImgSrc ? (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center bg-grey-03">
          <EmptyImgIcon />
        </div>
      ) : null}
    </div>
  );
};

export default DefaultImg;
