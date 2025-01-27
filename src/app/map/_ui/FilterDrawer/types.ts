import { MapFilter } from "@/app/map/_types/types";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { SetState } from "@/shared/types/react";

export type Props = {
  isOpen: boolean;

  selectedStyles: StyleEntity[];
  setStyle: SetState<StyleEntity[]>;

  selectedGenre?: GenreEntity;
  setGenre: SetState<GenreEntity | undefined>;

  selectedAge?: AgeEntity;
  setAge: SetState<AgeEntity | undefined>;

  mapFilter: MapFilter;
  setMapFilter: SetState<MapFilter>;
};
