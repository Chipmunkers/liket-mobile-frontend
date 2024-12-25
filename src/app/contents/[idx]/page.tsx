import ErrorPage from "../../error";
import DetailContent from "./_ui/DetailContent";
import ContentNotFound from "./_ui/ContentNotFound";
import customFetch from "@/shared/helpers/fetch";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import { Metadata } from "next";

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
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/contents/${params.idx}`,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      images: [
        { url: process.env.NEXT_PUBLIC_IMAGE_SERVER + content.thumbnail },
      ],
      url: `https://liket.site/contents/${params.idx}`,
      type: "article",
    },
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
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderRight
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
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderRight
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
