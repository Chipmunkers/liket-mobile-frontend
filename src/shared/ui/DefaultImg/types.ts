import { ReactNode } from "react";
import { SharedUiProps } from "../../types/react";

export type DefaultProps = {
  /**
   * 가로
   *
   * @example 336px
   * @default 100%
   */
  width?: string;

  /**
   * 세로
   *
   * @example 390px
   * @default 100%
   */
  height?: string;

  /**
   * Object-Fit Cover 옵션 추가 여부
   *
   * @default true
   */
  cover?: boolean;

  /**
   * 이미지 경로
   */
  src: string;

  /**
   * 이미지 호스트. 기본적으로 S3에서 가져오며 S3에서 가져오고 싶지 않을 때 해당 옵션 사용
   *
   * @default env.process.NEXT_PUBLIC_IMAGE_SERVER
   */
  srcHost?: string;

  /**
   * 대체 문자열. 비어있지 않는 것을 권장
   *
   * @default ""
   */
  alt?: string;

  /**
   * 이미지 선택 가능 여부
   *
   * @default false
   */
  select?: boolean;
};

export type PropsWithFallbackImg = DefaultProps & {
  /**
   * 이미지가 깨졌을 때 보여줄 이미지 경로
   */
  fallbackImgSrc: string;

  /**
   * 이미지가 깨졌을 때 보여줄 이미지 호스트. 기본적으로 S3에서 가져오며 S3에서 가져오고 싶지 않을 때 해당 옵션 사용
   *
   * @default process.env.NEXT_PUBLIC_IMAGE_SERVER
   */
  fallbackImgHost?: string;
};

export type PropsWithFallbackComponent = DefaultProps & {
  /**
   * 이미지가 깨졌을 때 보여줄 컴포넌트. 기본적으로 이미지 한 중간에 배치됨.
   * 만약 한 중간에 배치되는 것을 원치않다면 감싸주는 컴포넌트가 필요함
   */
  fallbackComponent: ReactNode;

  /**
   * 이미지가 깨졌을 때 보여줄 컴포넌트 뒷 배경 색. 기본적으로 투명색
   */
  fallbackComponentBackgroundColor?: string;
};

export type Props = SharedUiProps<
  DefaultProps | PropsWithFallbackComponent | PropsWithFallbackImg
>;
