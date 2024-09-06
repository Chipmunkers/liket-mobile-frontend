import { Dayjs } from "dayjs";

export interface DateAndTime {
  before: Dayjs;
  selected: Dayjs | undefined;
}
