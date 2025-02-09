"use client";

import CreateLiketPage from "@/page/CreateLiket";

export default function Page({
  searchParams: { review },
}: {
  searchParams: { review: string };
}) {
  return <CreateLiketPage review={review} />;
}
