import { notFound } from "next/navigation";

import MovieContainer from "@/containers/movie";
import { getMovie } from "@/services/movie";

export async function generateMetadata({ params }) {
  const movie = await getMovie(params.id);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return <MovieContainer movie={movie} />;
}
