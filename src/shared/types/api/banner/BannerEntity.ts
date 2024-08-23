export interface BannerEntity {
  /**
   * 배너 인덱스
   *
   * @example 1
   */
  idx: number;

  /**
   * 배너 이름
   *
   * @example 빵빵이 배너
   */
  name: string;

  /**
   * 배너 링크
   *
   * @example https://dev.liket.site
   */
  link: string;

  /**
   * 배너 이미지 경로
   *
   * @example /banner/img_00001.jpg
   */
  imgPath: string;

  /**
   * 배너 순서
   */
  order: number;
}
