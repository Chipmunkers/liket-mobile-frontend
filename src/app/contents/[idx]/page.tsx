import Header from "@/components/Header";
import customFetch from "@/utils/fetch";
import ErrorPage from "../../error";
import DetailContent from "./components/DetailContent";
import ContentNotFound from "./components/ContentNotFound";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";

interface PageProps {
  params: {
    idx: string;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const res = await customFetch("/culture-content/" + idx, {
    next: { revalidate: 0 },
  });

  if (res.ok) {
    const content = await res.json();

    return (
      <>
        <Header>
          <LeftOption
            option={{
              back: true,
            }}
          />
          <RightOption
            option={{
              search: {},
            }}
          />
        </Header>
        <DetailContent content={content} />
      </>
    );
  }

  if ([403, 404].includes(res.status)) {
    return (
      <>
        <Header>
          <LeftOption
            option={{
              back: true,
            }}
          />
          <RightOption
            option={{
              search: {},
            }}
          />
        </Header>
        <ContentNotFound />
      </>
    );
  }

  return <ErrorPage />;
}
