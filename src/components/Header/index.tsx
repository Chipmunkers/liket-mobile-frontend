"use client";

import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { useIsWebView } from "../../hooks/useIsWebView";

type Props = StrictPropsWithChildren<{
  transparent?: boolean;
  checkUserAgent?: boolean;
  test?: string;
}>;

const Header = ({ children, transparent = false, checkUserAgent }: Props) => {
  const isWebview = useIsWebView();

  return (
    <header
      className={classNames(
        "header",
        isWebview && checkUserAgent ? "opacity-0" : "",
        transparent && "max-w-content mx-auto bg-transparent"
      )}
    >
      {children}
    </header>
  );
};

export default Header;
