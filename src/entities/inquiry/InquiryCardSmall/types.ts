import { SummaryInquiryEntity } from "@/shared/types/api/inquiry/SummaryInquiry";
import { EntityUiProps } from "@/shared/types/react";

type InquiryCardSmallInquiry = Pick<
  SummaryInquiryEntity,
  "idx" | "type" | "title" | "createdAt" | "isAnswered"
>;

export type Props = EntityUiProps<{
  /**
   * 문의 데이터
   */
  inquiry: InquiryCardSmallInquiry;

  /**
   * 문의 카드 클릭 이벤트
   *
   * @default "문의 자세히보기 페이지로 이동"
   */
  onClick?: (inquiry: InquiryCardSmallInquiry) => void;
}>;
