"use client";

import ScrollContainer from "react-indiana-drag-scroll";
import { StrictPropsWithChildren } from "@/types/common";

type Props = StrictPropsWithChildren<{
  className: string;
}>;

/**
 * @deprecated
 */
const Index = ({ children, className }: Props) => {
  return <ScrollContainer className={className}>{children}</ScrollContainer>;
};

export default Index;
