import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";

export const generateMapFilterQuerystring = (mapFilter: {
  genre: GenreEntity | undefined;
  age: AgeEntity | undefined;
  styles: StyleEntity[];
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
