import { notFound } from "next/navigation";

import MovieContainer from "@/containers/movie";
import { getMovie } from "@/services/movie";

export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return <MovieContainer movie={movie} />;
}
