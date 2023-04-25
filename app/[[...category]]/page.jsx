import HomeContainer from "@/containers/home";

import {
  getSingleCategory,
  getCategories,
  getTopRatedMovies,
  getPopularMovies,
  getFeaturedMovie,
} from "@/services/movie";

export async function generateMetadata({ params }) {
  if (params.category?.length > 0) {
    const { genres } = await getCategories(params.category[0]);
    const genre = genres.find((g) => g.id.toString() === params.category[0]);

    return {
      title: genre.name,
    };
  } else {
    return {
      title: "NetFilms",
    };
  }
}

export default async function HomePage({ params }) {
  let selectedCategory;

  const [
    { genres: categories },
    { results: topRatedMovies },
    { results: popularMovies },
    { results: movies },
  ] = await Promise.all([
    getCategories(),
    getTopRatedMovies(),
    getPopularMovies(),
    getFeaturedMovie(),
  ]);

  const randomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[randomIndex];

  if (params.category?.length > 0) {
    const { results } = await getSingleCategory(params.category[0]);
    selectedCategory = results;
  }

  return (
    <HomeContainer
      categories={categories}
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      movie={movie}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategory ? selectedCategory : [],
      }}
    />
  );
}
