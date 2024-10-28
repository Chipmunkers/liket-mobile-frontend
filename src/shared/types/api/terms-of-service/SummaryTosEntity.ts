import { TosEntity } from "@/shared/types/api/terms-of-service/TosEntity";

export interface SummaryTosEntity extends Omit<TosEntity, "contents"> {}
