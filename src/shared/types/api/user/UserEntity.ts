export interface UserEntity {
  idx: string;
  profileImgPath: string | null;
  nickname: string;
  provider: string;
  gender: number | null;
  email: string;
  birth: number | null;
  createdAt: string;
}
