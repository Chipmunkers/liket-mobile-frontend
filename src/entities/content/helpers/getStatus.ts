import dayjs from "dayjs";
import { ContentState } from "../../../shared/consts/content/state";

export const getStatus = (startDate: string, endDate: string): ContentState => {
  const today = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (today.isBefore(end) && today.isAfter(end.subtract(3, "day"))) {
    return "willClosed";
  } else if (
    (today.isAfter(start) && today.isBefore(end)) ||
    today.isSame(start) ||
    today.isSame(end)
  ) {
    return "active";
  } else if (today.isAfter(end)) {
    return "closed";
  }

  return "willActive";
};
