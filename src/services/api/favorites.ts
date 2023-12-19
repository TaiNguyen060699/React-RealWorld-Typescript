import { POST, DELETE } from "./config";

export const postFavorites = (slug: string) => {
  POST(`/articles/${slug}/favorites`)
}
export const deleteFavorites = (slug: string) => {
  DELETE(`/articles/${slug}/favorites`)
}

