"use client";

import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { useIsWebView } from "../../hooks/useIsWebView";

type Props = StrictPropsWithChildren<{
  transparent?: boolean;
  userAgent?: string;
  checkUserAgent?: boolean;
  test?: string;
}>;

const Header = ({
  children,
  transparent = false,
  userAgent,
  checkUserAgent,
}: Props) => {
  const isWebview = useIsWebView(userAgent);

  return (
    <header
      className={classNames(
        "header",
        isWebview && checkUserAgent ? "hidden" : "",
        transparent && "max-w-content mx-auto bg-transparent"
      )}
    >
      {children}
    </header>
  );
};

export default Header;
