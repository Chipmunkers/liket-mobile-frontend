export interface UserEntity {
  idx: number;
  profileImgPath: string | null;
  nickname: string;
  provider: string;
  gender: number | null;
  email: string;
  birth: number | null;
  createdAt: string;
}
