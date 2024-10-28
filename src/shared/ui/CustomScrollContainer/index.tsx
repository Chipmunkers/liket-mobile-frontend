"use client";

import ScrollContainer from "react-indiana-drag-scroll";
import { Props } from "./types";

const CustomScrollContainer = ({ children, className }: Props) => {
  return <ScrollContainer className={className}>{children}</ScrollContainer>;
};

export default CustomScrollContainer;
