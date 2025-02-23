import { Sido } from "@/shared/consts/region/sido";
import { Sigungu } from "@/shared/consts/region/sigungu";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";

export type MapInfo = {
  bound: {
    top: {
      x: number;
      y: number;
    };
    bottom: {
      x: number;
      y: number;
    };
  };
  zoomLevel: number;
};

export type MapFilter = {
  genre: GenreEntity | undefined;
  age: AgeEntity | undefined;
  styles: StyleEntity[];
};

export type SelectLocation = {
  sido: Sido;
  sigungu: Sigungu | null;
};
