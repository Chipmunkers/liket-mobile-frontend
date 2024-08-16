"use client";

import { StrictPropsWithChildren } from "@/types/common";
import LeftOption from "./LeftOption";
import RightOption from "./RightOption";
import MiddleText from "./MiddleText";
import { classNames } from "@/utils/helpers";

type Props = StrictPropsWithChildren<{ transparent?: boolean }>;

const Header = ({ children, transparent = false }: Props) => {
  return (
    <header
      className={classNames(
        "header",
        transparent && "max-w-content mx-auto bg-transparent"
      )}
    >
      {children}
    </header>
  );
};

export default Header;
