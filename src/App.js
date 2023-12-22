import { useEffect, useState } from "react";
import "./App.css";
import "./loader.css";
import searchIcon from "./search.svg"
import MovieCard from "./MovieCard";
import Loader from "./Loader";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=339bb6d2";

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    setIsloading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setIsloading(false);
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies("batman");
  }, [])

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="app">
      <h1>Movieland</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
