import { SearchPagerble } from "../_types/pagerble";
import { createQuerystring } from "../_util/createQueryString";
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
