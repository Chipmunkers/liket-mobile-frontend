export interface ClusteredContentEntity {
  /**
   * 해당 지역에 대한 법정동 코드.
   */
  code: string;

  /**
   * 경도
   *
   * @example 127.xx
   */
  lng: number;

  /**
   * 위도
   *
   * @example 33.xxx
   */
  lat: number;

  /**
   * 해당 지역에 존재하는 컨텐츠 개수
   *
   * @example 12
   */
  count: number;
}
