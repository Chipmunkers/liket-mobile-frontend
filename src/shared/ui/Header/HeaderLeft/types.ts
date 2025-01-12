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
        /**
         * 뒤로가기를 메인으로 할 것인지 여부. false일 경우 메인으로 back button이 메인페이지로 전송됨
         */
        referer?: boolean;
      };
    },
    { logo: boolean }
  >
>;
