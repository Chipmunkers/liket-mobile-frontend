"use client";

import Image, { ImageProps } from "next/image";
import { ComponentType, ReactElement, ReactNode, useState } from "react";
import { Switch, Case } from "react-if";

interface Props extends ImageProps {
  src: string;
  fallbackComponent?: ReactNode;
  fallbackImg?: string;
  alt: string;
}

const CustomImage = ({
  fallbackImg,
  fallbackComponent,
  alt,
  src,
  ...props
}: Props) => {
  const [isErrorEmit, setIsErrorTriggered] = useState(false);

  const handleError = () => setIsErrorTriggered(true);

  return (
    <>
      {!isErrorEmit && (
        <Image src={src} onError={handleError} alt={alt} {...props} />
      )}
      {isErrorEmit && fallbackImg && (
        <Image
          src={fallbackImg}
          alt={"이미지를 로드할 수 없습니다"}
          {...props}
        />
      )}
      {isErrorEmit && fallbackComponent}
    </>
  );
};

export default CustomImage;
