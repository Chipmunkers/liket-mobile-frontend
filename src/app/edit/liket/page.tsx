"use client";

import EditLiketPage from "@/page/EditLiket";

export default function Page({
  searchParams: { liketIdx },
}: {
  searchParams: { liketIdx: string };
}) {
  return <EditLiketPage liketIdx={liketIdx} />;
}
