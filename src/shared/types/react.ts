import { Dispatch, SetStateAction } from "react";

/**
 * State를 변경하는 set함수 타입 정의
 */
export type SetState<T = any> = Dispatch<SetStateAction<T>>;

/**
 * Shared UI Props 타입
 */
export type SharedUiProps<T extends Object> = T & {
  /**
   * 루트 컴포넌트에 추가될 class
   *
   * @default ""
   */
  className?: string;
};
