import { ContentState } from "@/shared/consts/content/state";
import dayjs from "dayjs";

export const getStatus = (startDate: string, endDate: string): ContentState => {
  const today = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (today.isBefore(start)) {
    return "willActive";
  } else if (
    (today.isBefore(end) && today.isAfter(end.subtract(4, "day"))) ||
    today.isSame(end)
  ) {
    return "willClosed";
  } else if (today.isAfter(end)) {
    return "closed";
  } else {
    return "active";
  }
};
