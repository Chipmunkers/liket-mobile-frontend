import { Dispatch, ReactNode, SetStateAction } from "react";

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

/**
 * Widget UI Props 타입
 */
export type WidgetUiProps<T extends Object> = T & {
  /**
   * 루트 컴포넌트에 추가될 class
   *
   * @default ""
   */
  className?: string;
};

/**
 * Entity UI Props 타입
 */
export type EntityUiProps<T extends Object> = T & {
  /**
   * 루트 컴포넌트에 추가될 class
   *
   * @default ""
   */
  className?: string;
};

/**
 * 자식 요소를 가지는 컴포넌트의 Props 정의
 */
export type StrictPropsWithChildren<T = unknown, U = ReactNode> = T & {
  /**
   * 자식 요소
   */
  children: U;
};
