"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import {
  Props,
  PropsWithFallbackComponent,
  PropsWithFallbackImg,
} from "./types";
import { classNames } from "../../helpers/classNames";
import EmptyImgIcon from "./icon/EmptyImgIcon.svg";

const DefaultImg = ({
  alt = "",
  className = "",
  srcHost = process.env.NEXT_PUBLIC_IMAGE_SERVER,
  cover = true,
  width = "100%",
  height = "100%",
  src,
  ...props
}: Props) => {
  const [isErrorEmit, setIsErrorTriggered] = useState(false);

  const handleError = () => setIsErrorTriggered(true);

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
      {!isErrorEmit && (
        <Image
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
        <div className="w-[100%] h-[100%] flex justify-center items-center bg-grey-03">
          <EmptyImgIcon />
        </div>
      ) : null}
    </div>
  );
};

export default DefaultImg;
