import { Age, Genre, Style } from "@/types/content";

export const generateMapFilterQuerystring = (mapFilter: {
  genre: Genre | undefined;
  age: Age | undefined;
  styles: Style[];
}) => {
  let querystring = ``;

  if (mapFilter.genre) {
    querystring += `genre=${mapFilter.genre.idx}&`;
  }
  if (mapFilter.age) {
    querystring += `age=${mapFilter.age.idx}&`;
  }
  for (const i in mapFilter.styles) {
    const style = mapFilter.styles[i];

    querystring += `styles[${i}]=${style.idx}&`;
  }

  return querystring;
};
