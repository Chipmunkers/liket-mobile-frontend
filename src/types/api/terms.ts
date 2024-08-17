export interface SummaryTosEntity extends Omit<TosEntity, "contents"> {}

export interface TosEntity {
  idx: number;
  title: string;
  isEssential: boolean;
  createdAt: string;
  updatedAt: string;
  contents: string;
}
