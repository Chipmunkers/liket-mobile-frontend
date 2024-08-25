"use client";

import DetailContent from "./_ui/DetailContent";
import ContentNotFound from "./_ui/ContentNotFound";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  if (isNaN(Number(idx))) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
        </Header>
        <ContentNotFound />
      </>
    );
  }

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderRight
          option={{
            search: {},
          }}
        />
      </Header>
      <DetailContent idx={Number(idx)} />
    </>
  );
}
