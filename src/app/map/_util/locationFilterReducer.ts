import { SIDO_LIST } from "@/shared/consts/region/sido";
import { SIGUNGU_LIST } from "@/shared/consts/region/sigungu";
import { SelectLocation } from "../_types/types";

export type SelectLocationAction =
  | { type: "ABORT_DRAFT" }
  | {
      type: "UPDATE_DRAFT";
      payload: SelectLocation;
    }
  | {
      type: "APPLY_DRAFT";
    };

export const selectedLocationReducer = (
  state: {
    draft: SelectLocation;
    applied: SelectLocation;
  },
  action: SelectLocationAction
) => {
  switch (action.type) {
    case "ABORT_DRAFT":
      return {
        ...state,
        draft: {
          sido: state.applied.sido,
          sigungu: state.applied.sigungu,
        },
      };
    case "UPDATE_DRAFT": {
      const { payload } = action;
      return {
        ...state,
        draft: {
          sigungu: payload.sigungu,
          sido: payload.sido,
        },
      };
    }

    case "APPLY_DRAFT":
      return {
        ...state,
        applied: {
          sido: state.draft.sido,
          sigungu: state.draft.sigungu,
        },
      };
    default:
      throw new Error("다루지 않는 case가 존재합니다.");
  }
};

export const initializeSelectedLocationState = (searchParams: string) => {
  const INITIAL_SELECTED_LOCATION: {
    draft: SelectLocation;
    applied: SelectLocation;
  } = {
    draft: {
      sido: SIDO_LIST[0],
      sigungu: null,
    },
    applied: {
      sido: SIDO_LIST[0],
      sigungu: null,
    },
  };

  const params = new URLSearchParams(searchParams);
  const sido_cd = params.get("sido_cd");
  const sigungu_cd = params.get("sigungu_cd");

  INITIAL_SELECTED_LOCATION.draft.sido =
    SIDO_LIST.find(({ cd }) => sido_cd === cd) ||
    SIDO_LIST.find(({ name }) => name === "서울") ||
    SIDO_LIST[0];

  INITIAL_SELECTED_LOCATION.draft.sigungu =
    SIGUNGU_LIST.find(({ cd }) => sigungu_cd === cd) ||
    SIGUNGU_LIST.find(({ name }) => name === "성동구") ||
    null;

  INITIAL_SELECTED_LOCATION.applied.sido =
    SIDO_LIST.find(({ cd }) => sido_cd === cd) ||
    SIDO_LIST.find(({ name }) => name === "서울") ||
    SIDO_LIST[0];

  INITIAL_SELECTED_LOCATION.applied.sigungu =
    SIGUNGU_LIST.find(({ cd }) => sigungu_cd === cd) ||
    SIGUNGU_LIST.find(({ name }) => name === "성동구") ||
    null;

  return INITIAL_SELECTED_LOCATION;
};
