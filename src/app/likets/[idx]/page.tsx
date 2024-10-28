import DevIng from "@/widgets/common/DevIng";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  return <DevIng />;
}
