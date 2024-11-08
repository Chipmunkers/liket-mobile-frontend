import customFetch from "@/shared/helpers/fetch";
import { TosEntity } from "@/shared/types/api/terms-of-service/TosEntity";

export const getTosByIdx = async (idx: number): Promise<TosEntity> =>
  (await customFetch(`/tos/${idx}`)).json();
