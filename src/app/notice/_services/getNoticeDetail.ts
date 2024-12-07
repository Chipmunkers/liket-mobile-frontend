import customFetch from "@/shared/helpers/fetch";
import { SummaryNoticeEntity } from "@/shared/types/api/notice/SummaryNoticeEntity";

export const getNoticeDetail = async (
  idx: string
): Promise<SummaryNoticeEntity> => (await customFetch(`/notice/${idx}`)).json();
