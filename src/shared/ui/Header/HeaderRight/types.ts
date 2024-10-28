import { XOR } from "@/shared/types/util";
import { IconButtonOption } from "@/shared/ui/Header/types";

export type Props = XOR<
  {
    text: string;
  },
  {
    option: {
      search?: IconButtonOption;
      like?: IconButtonOption;
      create?: IconButtonOption;
      menu?: IconButtonOption;
      check?: IconButtonOption;
    };
  }
>;
