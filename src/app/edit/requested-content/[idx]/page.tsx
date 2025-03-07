"use client";

import EditContentPage from "@/page/EditContent";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  return <EditContentPage idx={idx} />;
}
