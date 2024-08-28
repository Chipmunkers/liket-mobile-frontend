"use client";

import DetailContent from "./_ui/DetailContent";
import ContentNotFound from "./_ui/ContentNotFound";
import { Header, HeaderLeft } from "@/shared/ui/Header";
import { useGetCultureContentByIdx } from "./_hooks/useGetContentByIdx";
import ContentSkeleton from "./_ui/ContentSkeleton";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { ButtonBase } from "@mui/material";
import { useState } from "react";
import AdjustDrawer from "@/app/requested-contents/[idx]/_ui/AdjustDrawer";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  const { data: content, error } = useGetCultureContentByIdx(Number(idx));
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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

  if (error && error.response?.status === 404) {
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
        <ButtonBase
          className="w-[48px] h-[48px] mr-[12px] rounded-full"
          onClick={() => setIsOpenDrawer(true)}
        >
          <MeatballIcon />
        </ButtonBase>
      </Header>
      {content ? <DetailContent content={content} /> : <ContentSkeleton />}
      {content && (
        <AdjustDrawer
          acceptedAt={content.acceptedAt}
          isOpen={isOpenDrawer}
          setIsOpen={setIsOpenDrawer}
          idx={Number(idx)}
        />
      )}
    </>
  );
}
