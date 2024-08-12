declare global {
  interface Window {
    daum: any;
  }
}

interface SelectedAddress {
  userSelectedType: "R";
  address: string;
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
}

declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
