export interface SummaryInquiryEntity {
  isAnswered: boolean;
  idx: number;
  title: string;
  type: {
    idx: number;
    name: string;
  };
  thumbnail: string;
  author: {
    idx: number;
    profileImgPath: string;
    nickname: string;
    provider: string;
  };
}
