import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
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
