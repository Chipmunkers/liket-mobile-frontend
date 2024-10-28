import { EntityUiProps } from "@/shared/types/react";

export type Props = EntityUiProps<{
  /**
   * 리뷰 인덱스
   *
   * @example 12
   */
  idx: number;

  /**
   * 좋아요 상태
   *
   * @example true
   */
  likeState: boolean;

  /**
   * 좋아요 개수
   *
   * @example 12
   */
  likeCount: number;

  /**
   * 읽기 전용인지 여부
   *
   * @default false
   */
  readonly?: boolean;
}>;
