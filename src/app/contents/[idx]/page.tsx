import Header from "@/components/Header";
import DetailContent from "../../../components/DetailContent";
import customFetch from "../../../utils/fetch";
import { notFound } from "next/navigation";
import ErrorPage from "../../error";

interface PageProps {
  params: {
    idx: string;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const res = await customFetch("/culture-content/" + idx, {
    next: { revalidate: 0 },
  });

  console.log(res.status);

  if (res.ok) {
    const content = await res.json();

    return (
      <>
        <Header>
          <Header.LeftOption
            option={{
              back: true,
            }}
          />
          {/* <Header.RightOption
            option={{
              search: {
                // onClick: () => {},
              },
            }}
          /> */}
        </Header>
        <DetailContent content={content} />
      </>
    );
  }

  if ([403, 404].includes(res.status)) {
    // TODO: 컨텐츠 없는 컴포넌트로 변경해야함
    return notFound();
  }

  return <ErrorPage />;
}
