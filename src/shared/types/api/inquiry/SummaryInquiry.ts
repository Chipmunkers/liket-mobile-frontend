import { InquiryEntity } from "@/shared/types/api/inquiry/InquiryEntity";

export interface SummaryInquiryEntity
  extends Pick<
    InquiryEntity,
    "idx" | "title" | "type" | "thumbnail" | "author" | "createdAt"
  > {
  isAnswered: boolean;
}
