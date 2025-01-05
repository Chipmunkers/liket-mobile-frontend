import { AgeEntity } from "../tag/AgeEntity";
import { GenreEntity } from "../tag/GenreEntity";
import { StyleEntity } from "../tag/StyleEntity";
import { LocationEntity } from "./LocationEntity";

export interface ContentEntity {
  idx: number;
  title: string;
  description?: string;
  thumbnail: string;
  imgList: string[];
  genre: GenreEntity;
  style: StyleEntity[];
  age: AgeEntity;
  location: LocationEntity;
  startDate: string;
  endDate: string;
  likeState: boolean;
  openTime?: string;
  websiteLink?: string;
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
