"use client";

import { classNames } from "@/shared/helpers/classNames";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { Props } from "./types";

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
