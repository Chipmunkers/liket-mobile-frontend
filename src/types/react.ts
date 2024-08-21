import { Dispatch, SetStateAction } from "react";

/**
 * @deprecated
 */
export type SetState<T = any> = Dispatch<SetStateAction<T>>;
