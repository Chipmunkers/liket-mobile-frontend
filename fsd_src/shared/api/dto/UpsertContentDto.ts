import { LocationEntity } from "../entity/LocationEntity";

export interface UpsertContentDto {
  imgList: string[];
  genreIdx: number;
  ageIdx: number;
  styleIdxList: number[];
  title: string;
  location: LocationEntity;
  description: string | null;
  websiteLink: string | null;
  startDate: string;
  endDate: string | null;
  openTime: string | null;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
}
