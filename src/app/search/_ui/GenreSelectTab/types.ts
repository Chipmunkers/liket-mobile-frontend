import { SearchPagerble } from "../../_types/pagerble";
import { SetState } from "@/shared/types/react";

export type Props = {
  pagerble: SearchPagerble;
  setPagerble: SetState<SearchPagerble>;
};
