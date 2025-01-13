export interface KeywordSearchResultEntity {
  meta: {
    /**
     * 검색어에 검색된 문서 수
     */
    totalCount: number;

    /**
     * total_count 중 노출 가능 문서 수 (최대: 45)
     */
    pageableCount: number;

    /**
     * 현재 페이지가 마지막 페이지인지 여부
     * 값이 false면 다음 요청 시 page 값을 증가시켜 다음 페이지 요청 가능
     */
    isEnd: boolean;

    /**
     * 질의어의 지역 및 키워드 분석 정보
     */
    sameName: {
      /**
       * 질의어에서 인식된 지역의 리스트
       * 예: '중앙로 맛집' 에서 중앙로에 해당하는 지역 리스트
       */
      region: string[];

      /**
       * 질의어에서 지역 정보를 제외한 키워드
       * 예: '중앙로 맛집' 에서 '맛집'
       */
      keyword: string | null;

      /**
       * 인식된 지역 리스트 중, 현재 검색에 사용된 지역 정보
       */
      selectedRegion: string | null;
    };
  };
  documents: {
    /**
     * 장소 ID
     *
     * @example "26338954"
     */
    id: string;

    /**
     * 장소명, 업체명
     *
     * @example "카카오프렌즈 코엑스점"
     */
    placeName: string;

    /**
     * 카테고리 이름
     *
     * @example "가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈"
     */
    categoryName: string | null;

    /**
     * 주요 카테고리만 그룹핑한 카테고리 그룹 코드
     *
     * @example null
     */
    categoryGroupCode: string | null;

    /**
     * 주요 카테고리만 그룹핑한 카테고리 그룹명
     *
     * @example null
     */
    categoryGroupName: string | null;

    /**
     * 전화번호
     *
     * @example "02-6002-1880"
     */
    phone: string | null;

    /**
     * 전체 지번 주소
     *
     * @example "서울 강남구 삼성동 159"
     */
    addressName: string;

    /**
     * 전체 도로명 주소
     *
     * @example "서울 강남구 영동대로 513"
     */
    roadAddressName: string;

    /**
     * X 좌표값, 경위도인 경우 longitude (경도)
     *
     * @example 127.05902969025047
     */
    x: string;

    /**
     * Y 좌표값, 경위도인 경우 latitude (위도)
     *
     * @example 37.51207412593136
     */
    y: string;

    /**
     * 장소 상세페이지 URL
     *
     * @example "http://place.map.kakao.com/26338954"
     */
    placeUrl: string | null;

    /**
     * 중심좌표까지의 거리 (단위 meter)
     *
     * @example 418
     */
    distance: number | null;
  }[];
}
