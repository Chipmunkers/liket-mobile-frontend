import { XOR } from "@/shared/types/util";
import { IconButtonOption } from "@/shared/ui/Header/types";

export type Props = XOR<
  {
    townName: string;
    onClickTownSelection: () => void;
  },
  XOR<
    {
      option: {
        back?: IconButtonOption;
        close?: IconButtonOption;
      };
    },
    { logo: boolean }
  >
>;
