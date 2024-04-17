const fetchMovieData = async (movie, sucessCallback, errorCallback) => {
  try {
    const genreResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=10204d4173c2f9f2640589a472016781`,
    );
    const genreData = await genreResponse.json();

    sucessCallback(genreData);
  } catch (error) {
    errorCallback(error);
  }
};
export default fetchMovieData;
