import { Dispatch, SetStateAction } from "react";

export type SetState<T = any> = Dispatch<SetStateAction<T>>;
