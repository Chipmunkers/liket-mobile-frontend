"use client";

import { useEffect, useState } from "react";
import {
  HotContentEntity,
  SummaryContentEntity,
} from "../../../types/api/culture-content";
import { ReviewEntity } from "../../../types/api/review";
import { BannerListItem } from "../../../types/banner";
import WebviewMain from "./Main";
import WebviewMap from "./Map";
import BottomNav from "./BottomNav";
import WebviewMyPage from "./Mypage";

const WebviewWrap = (props: {
  soonOpenContents: SummaryContentEntity[];
  soonEndContents: SummaryContentEntity[];
  bannerList: BannerListItem[];
  hotContentList: HotContentEntity[];
  reviews: ReviewEntity[];
}) => {
  const {
    soonOpenContents,
    soonEndContents,
    bannerList,
    hotContentList,
    reviews,
  } = props;

  const [page, setPage] = useState<"main" | "map" | "mypage">("main");

  useEffect(() => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        page: page,
      })
    );
  }, [page]);

  return (
    <>
      {page === "main" ? (
        <WebviewMain
          soonEndContents={soonEndContents}
          soonOpenContents={soonOpenContents}
          bannerList={bannerList}
          hotContentList={hotContentList}
          reviews={reviews}
        />
      ) : null}
      {page === "map" ? <WebviewMap setPage={setPage} /> : null}
      {page === "mypage" ? <WebviewMyPage /> : null}

      <BottomNav setPage={setPage} page={page} />
    </>
  );
};

export default WebviewWrap;
