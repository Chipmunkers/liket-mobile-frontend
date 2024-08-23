import { ReadonlyURLSearchParams } from "next/navigation";

export const getQuerystring = (searchParams: ReadonlyURLSearchParams) => {
  return {
    style: searchParams.getAll("style"),
    region: searchParams.get("region"),
    genre: searchParams.get("genre"),
    age: searchParams.get("age"),
    open: searchParams.get("open"),
    orderby: searchParams.get("orderby"),
    search: searchParams.get("search"),
  };
};
