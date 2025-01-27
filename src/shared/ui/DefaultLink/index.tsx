"use client";

import { useRouter } from "next/navigation";
import { Props } from "./type";
import { useEffect } from "react";
import { isExternalLink } from "@/shared/ui/DefaultLink/utils/isExternalLink";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { classNames } from "@/shared/helpers/classNames";

export const DefaultLink = ({
  href,
  routerOption,
  className = "",
  children,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!isExternalLink(href)) {
      router.prefetch(href);
    }
  }, []);

  return (
    <a
      className={classNames(className)}
      rel={isExternalLink(href) ? "noopener noreferrer" : ""}
      href={href}
      onClick={(e) => {
        e.preventDefault();

        if (routerOption) {
          stackRouterPush(router, routerOption);
          return;
        }

        router.push(href);
      }}
    >
      {children}
    </a>
  );
};
