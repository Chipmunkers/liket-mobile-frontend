import { LocationEntity } from "./location";
import { AgeEntity, GenreEntity, StyleEntity } from "./tag";

export interface ContentEntity {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  imgList: string[];
  genre: GenreEntity;
  style: StyleEntity[];
  age: AgeEntity;
  location: LocationEntity;
  startDate: string;
  endDate: string;
  likeState: boolean;
  openTime: string;
  websiteLink: string;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
  likeCount: number;
  reviewCount: number;
  avgStarRating: number;
  createdAt: string;
  acceptedAt: string;
}

export interface SummaryContentEntity
  extends Pick<
    ContentEntity,
    | "idx"
    | "title"
    | "thumbnail"
    | "genre"
    | "style"
    | "location"
    | "startDate"
    | "endDate"
    | "likeState"
    | "createdAt"
    | "acceptedAt"
  > {}
