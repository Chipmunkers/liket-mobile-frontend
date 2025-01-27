"use client";

import { useRouter } from "next/navigation";
import { Props } from "./type";
import { useEffect } from "react";
import { isExternalLink } from "@/shared/ui/DefaultLink/utils/isExternalLink";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { classNames } from "@/shared/helpers/classNames";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { openExternalLinkOnWebview } from "@/shared/helpers/openExternalLinkOnWebview";

/**
 * 링크 태그 대신 사용하는 Link 태그
 *
 * routerOption을 넣을 경우 앱뷰에서 스크린이 전환됩니다.
 * 넣지 않은 경우, 스크린이 전환되지 않으며 외부 링크의 경우 새로운 창이 열립니다.
 */
export const DefaultLink = ({
  href,
  routerOption,
  className = "",
  children,
}: Props) => {
  const router = useRouter();
  const isWebview = useIsWebView();

  useEffect(() => {
    if (!isExternalLink(href)) {
      router.prefetch(href);
    }
  }, []);

  return (
    <a
      target={isExternalLink(href) ? "_blank" : ""}
      className={classNames(className)}
      rel={isExternalLink(href) ? "noopener noreferrer" : ""}
      draggable={false}
      href={href}
      onClick={(e) => {
        e.preventDefault();

        if (href === "") {
          return;
        }

        if (routerOption) {
          stackRouterPush(router, routerOption);
          return;
        }

        if (isExternalLink(href)) {
          if (isWebview) {
            openExternalLinkOnWebview(href);
          } else {
            window.open(href);
          }

          return;
        }

        router.push(href);
      }}
    >
      {children}
    </a>
  );
};
