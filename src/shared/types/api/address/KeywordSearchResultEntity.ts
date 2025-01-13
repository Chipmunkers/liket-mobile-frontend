import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";

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
  documents: KeywordSearchDocumentEntity[];
}
