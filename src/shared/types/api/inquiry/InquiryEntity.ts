import { AnswerEntity } from "@/shared/types/api/inquiry/AnswerEntity";
import { InquiryTypeEntity } from "@/shared/types/api/inquiry/InquiryTypeEntity";
import { UserEntity } from "@/shared/types/api/user/UserEntity";

export interface InquiryEntity {
  idx: number;
  title: string;
  type: InquiryTypeEntity;
  thumbnail: string | null;
  author: Pick<UserEntity, "idx" | "profileImgPath" | "nickname" | "provider">;
  contents: string;

  /**
   * 현재 기획상 답변은 딱 하나만 생성됩니다.
   */
  answerList: AnswerEntity[];

  imgList: string[];

  createdAt: Date;
}
