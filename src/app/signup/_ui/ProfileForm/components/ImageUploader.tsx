import { useRef, useState } from "react";
import { getRefValue } from "@/shared/helpers/getRefValue";
import { classNames } from "@/shared/helpers/classNames";
import DefaultProfileIcon from "@/shared/icon/user/DefaultProfileIcon.svg";
import { SharedUiProps } from "@/shared/types/react";
import Image from "next/image";
import PlusIcon from "./PlusIcon.svg";

type Props = SharedUiProps<{
  /**
   * 파일이 업로드된 이후에 실행할 함수
   *
   * @param file 업로드된 함수
   */
  onUpload?: (file: File) => void;

  /**
   * 업로드 시 사진 미리보기 여부
   *
   * @default true
   */
  preview?: boolean;

  /**
   * 초기 이미지
   *
   * @default ""
   */
  src?: string;
}>;

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
          <DefaultImg src={ImgSrc} />
        ) : (
          <div className="bg-grey-01 w-[100%] h-[100%] flex justify-center items-center">
            <DefaultProfileIcon className="w-[48px] h-[48px]" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
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

const DefaultImg = ({ src }: Props) => {
  const [isErrorEmit, setIsErrorTriggered] = useState(false);

  const handleError = () => setIsErrorTriggered(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {src && (
        <Image
          className={classNames(true ? "select-none" : "")}
          src={src}
          onError={handleError}
          alt={"프로필 이미지"}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};
