"use client";

import Link from "next/link";
import RightArrow from "@/icons/right-arrow.svg";
import { Props } from "./types";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { classNames } from "@/shared/helpers/classNames";

const LinkItem = ({ children, href, screen, className = "" }: Props) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={classNames(
        "flex justify-between items-center w-[100%] h-[48px] px-[24px]",
        className
      )}
      onClick={(e) => {
        e.preventDefault();

        stackRouterPush(router, {
          path: href,
          screen,
        });
      }}
    >
      <div className="text-h2">{children}</div>
      <RightArrow />
    </Link>
  );
};

export default LinkItem;
