import { AgeType, ContentStateType, GenreType, StyleType } from "./const";

// ! 삭제 필요
export interface ContentListItem {
  idx: number;
  title: string;
  thumbnail: string;
  genre: Genre;
  style: Style[];
  age: Age;
  location: Location;
  // TODO: status 상태 삭제 예정
  status: ContentStateType;
  startDate: string;
  endDate: string;
  likeState: boolean;
  createdAt: string;
  acceptedAt: string;
}

// ! 삭제 필요
export interface ContentDetailInformation extends ContentListItem {
  description: string;
  imgList: string[];
  openTime: string;
  websiteLink: string;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
  likeCount: number;
  reviewCount: number;
  avgStarRating: number;
}

export interface Genre {
  idx: number;
  name: GenreType;
}

export interface Style {
  idx: number;
  name: StyleType;
  title: string;
}

export interface Age {
  idx: number;
  name: AgeType;
}

export interface Location {
  detailAddress: string;
  address: string;
  region1Depth: string;
  region2Depth: string;
  positionX: number;
  positionY: number;
  hCode: string;
  bCode: string;
}
