import { Genre, Location } from "../../../types/content";

export interface Content {
  idx: number;
  title: string;
  genre: Genre;
  starDate: Date;
  endDate: Date;
  location: Location;
  likeState: boolean;
  imgList: string[];
}
