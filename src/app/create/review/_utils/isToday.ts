import dayjs, { Dayjs } from "dayjs";

export const isToday = (date: Dayjs | undefined) => {
  if (date) {
    const todayStr = dayjs().format("YYYY.MM.DD");
    const dateStr = date.format("YYYY.MM.DD");

    return todayStr === dateStr;
  }

  return false;
};
