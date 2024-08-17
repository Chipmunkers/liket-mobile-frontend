import LinkableTab from "../../components/LinkableTab";
import { getSoonOpenContentsForServer } from "../_hooks/getSoonOpenContents";
import { getSoonEndContentsForServer } from "../_hooks/getSoonEndContents";
import { getBanners } from "../_hooks/getBanners";
import { getHotContentsForServer } from "../_hooks/getHotContents";
import { getHotReview } from "../_hooks/getHotReviews";
import WebviewWrap from "./components/Wrap";
import BottomNav from "./components/BottomNav";

interface PageProps {
  params: {
    page: string;
  };
}

const WebviewMainPage = async ({ params: { page } }: PageProps) => {
  const { contentList: soonOpenContents } =
    await getSoonOpenContentsForServer();
  const { contentList: soonEndContents } = await getSoonEndContentsForServer();
  const { bannerList } = await getBanners();
  const hotContentList = await getHotContentsForServer();
  const reviews = await getHotReview();

  return (
    <>
      <WebviewWrap
        soonEndContents={soonEndContents}
        soonOpenContents={soonOpenContents}
        bannerList={bannerList}
        hotContentList={hotContentList}
        reviews={reviews}
      />
    </>
  );
};

export default WebviewMainPage;
