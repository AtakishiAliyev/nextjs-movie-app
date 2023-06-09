import FeaturedMovie from "@/components/featured-movie"
import Categories from "@/components/categories"
import MoviesSection from "@/components/movies-section"

export default function HomeContainer({ categories = [], topRatedMovies = [], popularMovies = [], movie = topRatedMovies?.[0], selectedCategory }) {
    return (
        <div>
            <FeaturedMovie movie={movie} />
            <Categories categories={categories} />
            {selectedCategory.movies.length > 0 && <MoviesSection title={categories.find(genre => genre.id.toString() === selectedCategory.id).name} movies={selectedCategory.movies} />}
            <MoviesSection title="Top Rated Films" movies={topRatedMovies} />
            <MoviesSection title="Popular Films" movies={popularMovies} />
        </div>
    )
}
