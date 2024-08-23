import { useGetTosByIdx } from "@/app/terms/[idx]/_hooks/useGetTosByIdx";
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
      <main className="px-[24px] pt-[24px] mb-[24px]">{contents}</main>
    </>
  );
}
