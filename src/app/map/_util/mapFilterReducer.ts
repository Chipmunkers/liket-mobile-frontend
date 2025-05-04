import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { MapFilter } from "../_types/types";
import { AGES } from "@/shared/consts/content/age";
import { GENRES } from "@/shared/consts/content/genre";
import { STYLES } from "@/shared/consts/content/style";

export type MapFilterAction =
  | {
      type: "INITIALIZE";
    }
  | { type: "ABORT_DRAFT" }
  | { type: "APPLY_DRAFT" }
  | {
      type: "UPDATE_DRAFT_STYLES";
      payload: { style: StyleEntity; isSelected: boolean };
    }
  | {
      type: "UPDATE_DRAFT_GENRE";
      payload: { genre: GenreEntity; isSelected: boolean };
    }
  | {
      type: "UPDATE_DRAFT_AGE";
      payload: { age: AgeEntity; isSelected: boolean };
    }
  | {
      type: "UPDATE_APPLIED_STYLES";
      payload: { style: StyleEntity; isSelected: boolean };
    }
  | {
      type: "UPDATE_APPLIED_GENRE";
      payload: { genre: GenreEntity; isSelected: boolean };
    }
  | {
      type: "UPDATE_APPLIED_AGE";
      payload: { age: AgeEntity; isSelected: boolean };
    };

export const filterReducer = (
  state: {
    draft: MapFilter;
    applied: MapFilter;
  },
  action: MapFilterAction
) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        draft: {
          styles: [],
          genre: undefined,
          age: undefined,
        },
        applied: {
          styles: [],
          genre: undefined,
          age: undefined,
        },
      };
    case "ABORT_DRAFT":
      return {
        ...state,
        draft: {
          ...state.applied,
        },
      };
    case "UPDATE_DRAFT_STYLES": {
      const { isSelected, style } = action.payload;
      let newStyles = [...state.draft.styles];

      if (isSelected) {
        newStyles = newStyles.filter(
          ({ idx: tempIdx }) => tempIdx !== style.idx
        );
      } else {
        newStyles.push(style);
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          styles: newStyles,
        },
      };
    }
    case "UPDATE_DRAFT_GENRE": {
      const { isSelected, genre } = action.payload;

      return {
        ...state,
        draft: {
          ...state.draft,
          genre: isSelected ? undefined : genre,
        },
      };
    }
    case "UPDATE_APPLIED_AGE": {
      const { isSelected, age } = action.payload;

      return {
        applied: {
          ...state.applied,
          age: isSelected ? undefined : age,
        },
        draft: {
          ...state.draft,
          age: isSelected ? undefined : age,
        },
      };
    }
    case "UPDATE_APPLIED_STYLES": {
      const { isSelected, style } = action.payload;
      let newStyles = [...state.draft.styles];

      if (isSelected) {
        newStyles = newStyles.filter(
          ({ idx: tempIdx }) => tempIdx !== style.idx
        );
      } else {
        newStyles.push(style);
      }

      return {
        applied: {
          ...state.draft,
          styles: newStyles,
        },
        draft: {
          ...state.draft,
          styles: newStyles,
        },
      };
    }
    case "UPDATE_APPLIED_GENRE":
      const { isSelected, genre } = action.payload;

      return {
        applied: {
          ...state.applied,
          genre: isSelected ? undefined : genre,
        },
        draft: {
          ...state.draft,
          genre: isSelected ? undefined : genre,
        },
      };
    case "UPDATE_DRAFT_AGE": {
      const { isSelected, age } = action.payload;

      return {
        ...state,
        draft: {
          ...state.draft,
          age: isSelected ? undefined : age,
        },
      };
    }
    case "APPLY_DRAFT":
      return {
        ...state,
        applied: {
          ...state.draft,
        },
      };
    default:
      throw new Error("다루지 않는 case가 존재합니다.");
  }
};

export const initializeMapFilterState = (searchParams: string) => {
  const INITIAL_MAP_FILTER_VALUE: { draft: MapFilter; applied: MapFilter } = {
    draft: {
      styles: [],
      genre: undefined,
      age: undefined,
    },
    applied: {
      styles: [],
      genre: undefined,
      age: undefined,
    },
  };

  const params = new URLSearchParams(searchParams);
  const ageIdx = params.get("age");
  const styleIdxs = params.get("styles");
  const genreIdx = params.get("genre");

  if (ageIdx && !isNaN(Number(ageIdx))) {
    const age = AGES.find(({ idx }) => idx === +ageIdx);
    INITIAL_MAP_FILTER_VALUE.draft.age = age;
    INITIAL_MAP_FILTER_VALUE.applied.age = age;
  }

  if (genreIdx && !isNaN(Number(genreIdx))) {
    const genre = GENRES.find(({ idx }) => idx === +genreIdx);
    INITIAL_MAP_FILTER_VALUE.draft.genre = genre;
    INITIAL_MAP_FILTER_VALUE.applied.genre = genre;
  }

  if (styleIdxs) {
    const styles = STYLES.filter(({ idx }) =>
      styleIdxs.includes(idx.toString())
    );
    INITIAL_MAP_FILTER_VALUE.draft.styles = styles;
    INITIAL_MAP_FILTER_VALUE.applied.styles = styles;
  }

  return INITIAL_MAP_FILTER_VALUE;
};
