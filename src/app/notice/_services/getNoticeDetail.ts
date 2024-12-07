import customFetch from "@/shared/helpers/fetch";
import { NoticeEntity } from "@/shared/types/api/notice/NoticeEntity";

export const getNoticeDetail = async (idx: string): Promise<NoticeEntity> =>
  (await customFetch(`/notice/${idx}`)).json();
