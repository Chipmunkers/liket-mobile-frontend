import { ReactNode } from "react";

/**
 * @deprecated
 */
export type StrictPropsWithChildren<T = unknown, U = ReactNode> = T & {
  children: U;
};

/**
 * @deprecated
 */
export type EmptyFunction = () => void;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * @deprecated
 */
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

/**
 * @deprecated
 */
export type IconButtonOption =
  | boolean
  | {
      disabled?: boolean;
      active?: boolean;
      color?: string;
      onClick?: EmptyFunction;
    };

/**
 * @deprecated
 */
export type PartialPick<T, F extends keyof T> = Omit<T, F> &
  Partial<Pick<T, F>>;

/**
 * @deprecated
 */
export type RequireProperty<T, K extends keyof T> = T & Required<Pick<T, K>>;
