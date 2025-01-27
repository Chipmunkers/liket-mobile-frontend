import { StackRouterPushOption } from "@/shared/consts/webview/option";
import { SharedUiProps } from "@/shared/types/react";
import { PropsWithChildren } from "react";

export type Props = PropsWithChildren<
  SharedUiProps<{
    /**
     * 타고 갈 링크
     */
    href: string;

    /**
     * 웹뷰의 작동 방식에 대한 옵션
     *
     * * 없을 경우 다음과 같이 작동됨.
     * 웹의 경우
     *    1. 외부 링크: 현재 페이지에서 페이지가 이동됨.
     *    2. 내부 링크: 현재 페이지에서 페이지가 이동됨.
     * 앱의 경우
     *    1. 외부 링크: 외부 브라우저로 연결됨.
     *    2. 내부 링크: 현재 페이지에서 페이지가 이동됨.
     *
     * * 있을 경우 다음과 같이 작동됨.
     * 웹의 경우
     *    1. 외부 링크: 현재 페이지에서 페이지가 이동됨.
     *    2. 내부 링크: 현재 페이지에서 페이지가 이동됨.
     * 앱의 경우
     *    1. 외부 링크: 새로운 스크린에서 페이지 보여줌.
     *    2. 내부 링크: 새로운 스크린에서 페이지 보여줌
     */
    routerOption?: StackRouterPushOption;
  }>
>;
