export interface SummaryTosEntity extends Omit<TosEntity, "contents"> {}

/**
 * @deprecated
 */
export interface TosEntity {
  idx: number;
  title: string;
  isEssential: boolean;
  createdAt: string;
  updatedAt: string;
  contents: string;
}
