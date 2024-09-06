"use client";

import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { Props } from "./types";

const DetailTerms = ({ contents }: Props) => {
  const { safeArea } = useGetSafeArea();

  return (
    <main
      className="px-[24px] pt-[24px] mb-[24px]"
      style={{ paddingBottom: safeArea.bottom + "px" }}
    >
      {contents}
    </main>
  );
};

export default DetailTerms;
