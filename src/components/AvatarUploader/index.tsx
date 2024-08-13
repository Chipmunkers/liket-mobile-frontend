import { getRefValue } from "@/utils/helpers";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CustomImage from "../CustomImage";

interface AvatarUploaderProps {
  defaultAvatar?: string;
  onUploadImage: (file: File, json: string) => void;
}

const AvatarUploader = ({
  defaultAvatar = "/icons/default-avatar.svg",
  onUploadImage,
}: AvatarUploaderProps) => {
  const [ImgSrc, setImgSrc] = useState<string>(defaultAvatar);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-[80px] h-[80px] relative">
      <div
        className="w-[100%] h-[100%] rounded-full relative overflow-hidden cursor-pointer"
        onClick={() => {
          getRefValue(inputRef).click();
        }}
      >
        <Image
          src={ImgSrc || "/icons/default-avatar.svg"}
          alt="프로필 이미지"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;

          if (files) {
            const reader = new FileReader();
            const file = files[0];

            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                setImgSrc(reader.result);
                onUploadImage(files[0], reader.result);
              }
            };

            reader.readAsDataURL(file);
          }
        }}
      />
      <button
        type="button"
        className="absolute right-0 bottom-0"
        onClick={() => {
          getRefValue(inputRef).click();
        }}
      >
        <Image
          src="/icons/circle-plus.svg"
          width={24}
          height={24}
          alt="아바타 업로드 버튼"
        />
      </button>
    </div>
  );
};

export default AvatarUploader;
