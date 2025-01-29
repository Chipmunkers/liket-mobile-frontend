export const RECT_HEIGHT = 42;

export const PADDING_BETWEEN_TEXT_AND_BOX = 24;

export const FONT_SIZE = 16;

export const PADDING_BETWEEN_STAGE = 16;

export const STAGE_SIZE = {
  WIDTH: 294,
  HEIGHT: 468,
};

export const LIKET_CARD_HEIGHT = "468px";

export const LIKET_CARD_WIDTH = "294px";

export const BACKGROUND_CARD_SIZES = {
  SMALL: {
    x: PADDING_BETWEEN_STAGE,
    y: PADDING_BETWEEN_STAGE,
    width: STAGE_SIZE.WIDTH - PADDING_BETWEEN_STAGE * 2,
    height: STAGE_SIZE.HEIGHT - 81,
  },
  MEDIUM: {
    x: PADDING_BETWEEN_STAGE,
    y: PADDING_BETWEEN_STAGE,
    width: STAGE_SIZE.WIDTH - PADDING_BETWEEN_STAGE * 2,
    height: STAGE_SIZE.HEIGHT - PADDING_BETWEEN_STAGE * 2,
  },
  LARGE: { x: 0, y: 0, width: STAGE_SIZE.WIDTH, height: STAGE_SIZE.HEIGHT },
};

export const CARD_SIZE = {
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
  SMALL: "SMALL",
} as const;

export const CARD_SIZE_TO_INDEX = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
} as const;
