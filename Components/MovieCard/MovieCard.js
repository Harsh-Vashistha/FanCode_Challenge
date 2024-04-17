import React, {useState, useEffect} from 'react';
import MovieCardView from './MovieCardView';
import fetchMovieData from '../../utils/fetchMoviesData';
import constants from '../../constants';

const MovieCard = ({
  movie = [],
  setMinMaxYear,
  index,
  moviesLength,
  minMaxYear,
  scrollDir,
}) => {
  const [genres, setGenres] = useState([]);
  const [credits, setCredits] = useState([]);
  const [director, setDirector] = useState({});

  useEffect(() => {
    fetchMovieData(
      movie,
      (successCallback = async genreData => {
        setGenres(genreData.genres);
        if (index == moviesLength - 1 && scrollDir == constants.DOWN) {
          setMinMaxYear({
            minYear: minMaxYear.minYear,
            maxYear: parseInt(movie.release_date.substring(0, 4)),
          });
        }
        if (index == 1 && scrollDir == constants.UP) {
          setMinMaxYear({
            minYear: parseInt(movie.release_date.substring(0, 4)),
            maxYear: minMaxYear.maxYear,
          });
        }

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=10204d4173c2f9f2640589a472016781`,
        );
        const creditsData = await creditsResponse.json();
        setCredits(creditsData?.cast?.slice(0, 3));
        setDirector(
          creditsData?.crew.filter(
            item => item.known_for_department === constants.DIRECTING,
          )[0],
        );
      }),
      (errorCallback = error => {
        console.log('Error fetching movie data:', error);
      }),
    );
  }, [movie.id]);

  const handleImageError = e => {
    e.target.src = 'https://via.placeholder.com/200x300';
    e.target.onerror = null;
  };

  return (
    <MovieCardView
      movie={movie}
      genres={genres}
      credits={credits}
      director={director}
      handleImageError={handleImageError}
    />
  );
};

export default MovieCard;
