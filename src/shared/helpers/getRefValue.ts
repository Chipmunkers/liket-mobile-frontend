import { RefObject } from "react";

export const getRefValue = <C>(ref: RefObject<C>) => ref.current as C;
