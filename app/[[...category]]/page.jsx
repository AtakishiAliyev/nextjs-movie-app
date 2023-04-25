import HomeContainer from "@/containers/home";

import {
  getSingleCategory,
  getCategories,
  getTopRatedMovies,
  getPopularMovies,
} from "@/services/movie";

export default async function HomePage({ params }) {
  let selectedCategory;

  const [
    { genres: categories },
    { results: topRatedMovies },
    { results: popularMovies },
  ] = await Promise.all([
    getCategories(),
    getTopRatedMovies(),
    getPopularMovies(),
  ]);

  if (params.category?.length > 0) {
    const { results } = await getSingleCategory(params.category[0]);
    selectedCategory = results;
  }

  return (
    <HomeContainer
      categories={categories}
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? selectedCategory : [],
      }}
    />
  );
}
