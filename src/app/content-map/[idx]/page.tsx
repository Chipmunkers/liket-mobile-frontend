import { Header, HeaderLeft } from "@/shared/ui/Header";
import DetailGoogleMap from "./_ui/DetailGoogleMap";
import { Metadata } from "next";
import customFetch from "@/shared/helpers/fetch";

interface PageProps {
  params: {
    idx: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const res = await customFetch("/culture-content/" + params.idx, {
    next: { revalidate: 0 },
  });

  const content = await res.json();

  return {
    title: "지도 - " + content.title,
    description: content.title + "지도 보기",
    openGraph: {
      title: content.title,
      description: content.title + "지도 보기",
      images: [
        { url: process.env.NEXT_PUBLIC_IMAGE_SERVER + content.thumbnail },
      ],
      type: "article",
    },
  };
}

export default async function ContentMapPage({ params: { idx } }: PageProps) {
  const res = await customFetch("/culture-content/" + idx, {
    next: { revalidate: 0 },
  });

  const content = await res.json();

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
      </Header>
      <DetailGoogleMap content={res.ok ? content : undefined} />
    </>
  );
}
