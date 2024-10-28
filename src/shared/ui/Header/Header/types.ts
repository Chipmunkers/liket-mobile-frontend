import { StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<{
  transparent?: boolean;
  checkUserAgent?: boolean;
  test?: string;
}>;
