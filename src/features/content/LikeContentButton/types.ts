import { FeatureUiProps } from "@/shared/types/react";

export type Props = FeatureUiProps<{
  /**
   * 클릭 시 좋아요가 추가 될 컨텐츠
   * 비어있다면 클릭이 되지 않음
   */
  idx?: number;

  /**
   * 좋아요 상태
   *
   * @default false
   */
  likeState?: boolean;

  /**
   * 좋아요 개수
   * 비어있다면 좋아요 개수가 표시되지 않음
   */
  likeCount?: number;
}>;
