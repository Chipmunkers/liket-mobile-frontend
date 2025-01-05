import { getTosByIdx } from "@/app/terms/[idx]/_hooks/getTosByIdx";
import DetailTerms from "@/app/terms/[idx]/_ui/DetailTerms";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";

interface PageProps {
  params: {
    idx: number;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const { title, contents } = await getTosByIdx(idx);

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text={title} />
      </Header>
      <DetailTerms contents={contents} />
    </>
  );
}
