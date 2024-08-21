import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";
import { CSSProperties } from "react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 최대 길이. 최대 길이에 걸리면 다른 스타일이 표현됨
     */
    maxLength?: number;

    /**
     * 현재 길이. 최대 길이 비교를 위함
     */
    currentLength?: number;
    htmlFor?: string;

    /**
     * 필수 여부. 필수일 경우 이름 에스터리스크가 붙어서 표현됨
     *
     * @default false
     */
    required?: boolean;
  }>
>;
