import { SearchPagerble } from "@/app/search/_types/pagerble";
import { SetState } from "@/types/react";

export type Props = {
  pagerble: SearchPagerble;
  setPagerble: SetState<SearchPagerble>;
};
