import { LocationEntity } from "./location";
import { GenreEntity, StyleEntity } from "./tag";

export interface SummaryContentEntity {
  idx: number;
  title: string;
  thumbnail: string;
  genre: GenreEntity;
  style: StyleEntity[];
  location: LocationEntity;
  startDate: string;
  endDate: string;
  likeState: boolean;
  createdAt: string;
  acceptedAt: string;
}
