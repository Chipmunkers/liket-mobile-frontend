import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * 파일이 업로드된 이후에 실행할 함수
   *
   * @param file 업로드된 함수
   */
  onUpload?: (file: File) => void;

  /**
   * 업로드 여부. true일 경우 POST /upload/profile-img API를 호출함
   *
   * @default false
   */
  upload?: boolean;
}>;
