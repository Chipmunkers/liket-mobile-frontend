export interface UploadedFileEntity {
  /**
   * 전체 URL
   *
   * @example https://liket-for-dev.s3.ap-northeast-2.amazonaws.com/banner/img_00001.jpg
   */
  fullUrl: string;

  /**
   * 파일 이름
   *
   * @example img_00001.png
   */
  fileName: string;

  /**
   * 파일 확장자 명
   *
   * @example jpg
   */
  fileExt: string;

  /**
   * 파일 경로. 백엔드와 통신할 떄는 이 값으로 통신함
   *
   * @example /banner/img_00001.jpg
   */
  filePath: string;
}
