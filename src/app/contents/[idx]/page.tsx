import Header from "@/components/Header";
import { getContentDetailInformation } from "@/apis/content";
import DetailContent from "../../../components/DetailContent";
interface PageProps {
  params: {
    idx: string;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const content = await getContentDetailInformation(idx);

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
