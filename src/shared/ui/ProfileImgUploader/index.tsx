import { useRef, useState } from "react";
import { Props } from "./types";
import { getRefValue } from "@/shared/helpers/getRefValue";
import { classNames } from "@/shared/helpers/classNames";
import PlusIcon from "./icon/PlusIcon.svg";
import DefaultProfileIcon from "@/shared/icon/user/DefaultProfileIcon.svg";
import DefaultImg from "@/shared/ui/DefaultImg";

const ProfileImgUploader = ({
  onUpload,
  className = "",
  src = "",
  preview = true,
}: Props) => {
  const [ImgSrc, setImgSrc] = useState<string>(src);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classNames("w-[80px] h-[80px] relative", className)}>
      <div
        className="w-[100%] h-[100%] rounded-full relative overflow-hidden cursor-pointer border-[1px] border-grey-02"
        onClick={() => {
          getRefValue(inputRef).click();
        }}
      >
        {ImgSrc ? (
          <DefaultImg src={ImgSrc} alt="프로필 이미지" />
        ) : (
          <div className="bg-grey-01 w-[100%] h-[100%] flex justify-center items-center">
            <DefaultProfileIcon className="w-[48px] h-[48px]" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const files = e.target.files;

          if (!preview) {
            onUpload && files?.[0] && onUpload(files[0]);
            return;
          }

          if (files) {
            const reader = new FileReader();
            const file = files[0];

            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                setImgSrc(reader.result);
                onUpload && onUpload(files[0]);
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
        <PlusIcon />
      </button>
    </div>
  );
};

export default ProfileImgUploader;
