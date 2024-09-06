import { useGetTosByIdx } from "@/app/terms/[idx]/_hooks/useGetTosByIdx";
import DetailTerms from "@/app/terms/[idx]/_ui/DetailTerms";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";

interface PageProps {
  params: {
    idx: number;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const { title, contents } = await useGetTosByIdx(idx);

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
