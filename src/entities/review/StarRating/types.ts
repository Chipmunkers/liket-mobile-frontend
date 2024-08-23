import { EntityUiProps } from "@/shared/types/react";
import { XOR } from "@/shared/types/util";

export type Props = EntityUiProps<
  XOR<
    {
      onChangeRate: (rate: number) => void;
    },
    { readOnly: boolean }
  > & {
    value: number;
    inactiveFillColor?: string;
  }
>;
