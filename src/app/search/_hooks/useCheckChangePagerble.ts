import { SearchPagerble } from "@/app/search/_types/pagerble";
import { createQuerystring } from "@/app/search/_util/createQueryString";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckChangePagerble = (searchPagerble: SearchPagerble) => {
  const router = useRouter();

  useEffect(() => {
    if (!searchPagerble) return;

    router.replace("/search?" + createQuerystring(searchPagerble));
  }, [searchPagerble]);
};

export default useCheckChangePagerble;
