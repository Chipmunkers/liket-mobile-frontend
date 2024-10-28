import { DateAndTime } from "../../_types/DateAndTime";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import { SetState } from "@/shared/types/react";

export type Props = {
  review: ReviewEntity;

  dateInfo: DateAndTime;
  setDateInfo: SetState<DateAndTime>;

  timeInfo: DateAndTime;
  setTimeInfo: SetState<DateAndTime>;

  starRating: number;
  setStarRating: SetState<number>;

  description: string;
  setDescription: SetState<string>;

  uploadedImgs: string[];
  setUploadedImgs: SetState<string[]>;

  setIsDateDrawerOpen: SetState<boolean>;
  setIsTimeDrawerOpen: SetState<boolean>;
};
