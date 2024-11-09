import api from "./api";

export const recipeApi = api.injectEndpoints({
  reducerPath: "recipeApi",
  endpoints: (builder) => ({
    getRecipeByCategory: builder.query({
      query: (category) => `recipes/category/${category}`,
    }),
  }),
});

export const { useGetRecipeByCategoryQuery } = recipeApi;
