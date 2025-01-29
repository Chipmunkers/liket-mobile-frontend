"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { classNames } from "@/shared/helpers/classNames";
import LIKETLogo from "@/shared/icon/common/LIKETBlackLogo.svg";
import {
  Props,
  PropsWithFallbackComponent,
  PropsWithFallbackImg,
} from "./prop";

const DefaultImg = ({
  isPriority = false,
  alt = "",
  className = "",
  srcHost = process.env.NEXT_PUBLIC_IMAGE_SERVER,
  cover = true,
  width = "100%",
  height = "100%",
  select = false,
  src,
  testSrc = "",
  ...props
}: Props) => {
  const [isErrorEmit, setIsErrorTriggered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleError = () => setIsErrorTriggered(true);

  if (!src) src = "";

  // 유효하지 않은 경로일 경우 host가 src와 합쳐지게 되고 그럴 경우 허용되지 않은 host라는 에러가 발생함
  if (src && !src.startsWith("/")) {
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
      {!isErrorEmit && !isImageLoaded && (
        <div className="w-[100%] h-[100%] absolute bg-grey-01 flex justify-center items-center">
          <LIKETLogo
            style={{
              width: "50%",
              opacity: "20%",
            }}
          />
        </div>
      )}

      {/* fallbackImgSrc가 있을 경우 */}
      {isErrorEmit && fallbackImgSrc && (
        <Image
          priority={isPriority}
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
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 7H28V22.3846L25.3351 16.2349C24.639 14.6285 22.361 14.6285 21.6649 16.2349L19.5719 21.0648L19.3511 20.5249C18.6732 18.8679 16.3268 18.8679 15.6489 20.5249L13.8182 25H4V7ZM13 27H4C2.89543 27 2 26.1046 2 25V7C2 5.89543 2.89543 5 4 5H28C29.1046 5 30 5.89543 30 7V25C30 26.1046 29.1046 27 28 27H26.9536H22H17H13ZM10.5 17C12.433 17 14 15.433 14 13.5C14 11.567 12.433 10 10.5 10C8.567 10 7 11.567 7 13.5C7 15.433 8.567 17 10.5 17Z"
              fill="#7C7C7C"
            />
          </svg>
        </div>
      ) : null}

      {/* TODO: 라이켓 리스트 개발용으로 사용함. 사용하고 삭제 필요 */}
      {testSrc && (
        <Image
          priority={isPriority}
          className={classNames(!select ? "select-none" : "")}
          src={testSrc}
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

      {/* TODO: testSrc 조건은 라이켓 리스트 개발용으로 사용함. 사용하고 삭제 필요 */}
      {!isErrorEmit && !testSrc && (
        <Image
          onLoad={() => setIsImageLoaded(true)}
          priority={isPriority}
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
    </div>
  );
};

export default DefaultImg;
