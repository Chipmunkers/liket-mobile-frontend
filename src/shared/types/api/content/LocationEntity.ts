export interface LocationEntity {
  detailAddress?: string | null;
  address: string;
  region1Depth: string;
  region2Depth: string;
  positionX: number;
  positionY: number;
  hCode: string;
  bCode: string;
}
