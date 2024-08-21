import { SearchPagerble } from "../_types/pagerble";

export const createQuerystring = (data: SearchPagerble): string => {
  const params = new URLSearchParams();

  if (data.region) {
    params.set("region", data.region);
  }

  if (data.genre) {
    params.set("genre", data.genre);
  }

  if (data.age) {
    params.set("age", data.age);
  }

  if (data.open) {
    params.set("open", data.open);
  }

  if (data.orderby) {
    params.set("orderby", data.orderby);
  }

  if (data.search) {
    params.set("search", data.search);
  }

  if (data.style && data.style.length > 0) {
    data.style.forEach((style) => {
      params.append("style", style);
    });
  }

  return params.toString();
};
