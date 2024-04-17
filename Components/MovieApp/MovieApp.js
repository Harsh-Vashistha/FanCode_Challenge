import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import constants from '../../constants';
import MovieAppView from './MovieAppView';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenreList, setSelectedGenreList] = useState([]);
  const [year, setYear] = useState(2012);
  const [minMaxYear, setMinMaxYear] = useState({minYear: 2012, maxYear: 2012});
  const [scrollDir, setScrollDir] = useState('');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchMovies(constants.YEAR);
    setInitialLoad(false);
  }, [year]);

  useEffect(() => {
    setMovies([]);
    fetchMovies(constants.GENRE);
  }, [selectedGenreList]);

  useEffect(() => {
    if (!searchQuery.trim() && !initialLoad) {
      setPage(1);
      fetchMovies(constants.YEAR);
    }
  }, [searchQuery]);

  const handleGenreSelection = genreList => {
    setSelectedGenreList(genreList);
  };

  const scrollToSecondElement = () => {
    flatListRef.current.scrollToIndex({
      index: 18,
      animated: false,
    });
  };

  const handleOnEndReach = async () => {
    setYear(minMaxYear.maxYear + 1);
    setScrollDir(constants.DOWN);
  };

  const handleOnStartReach = async () => {
    setScrollDir(constants.UP);
    setYear(minMaxYear.minYear - 1);
    scrollToSecondElement();
  };

  const fetchMovies = async changeName => {
    try {
      setLoading(true);
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=10204d4173c2f9f2640589a472016781&sort_by=popularity.desc&vote_count.gte=100&primary_release_year=${year}`;
      if (selectedGenreList.length > 0) {
        const genreQuery = selectedGenreList.join('|');
        apiUrl += `&with_genres=${genreQuery}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (changeName === constants.YEAR) {
        if (scrollDir == constants.DOWN)
          setMovies(prev => {
            return [...prev, ...data.results.slice(0, 20)];
          });
        else {
          setMovies(prev => {
            return [...data.results.slice(0, 20), ...prev];
          });
        }
        setLoading(false);
      } else if (changeName === constants.GENRE) {
        setMovies(data.results);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isAtAnd =
      offsetY ===
      event.nativeEvent.contentSize.height -
        event.nativeEvent.layoutMeasurement.height;
    if (offsetY === 0) {
      handleOnStartReach();
    } else if (isAtAnd) {
      handleOnEndReach();
    }
  };

  const handleSearch = async query => {
    setSearchQuery(query);
    if (!query.trim() && movies.length === 0 && year !== 2012) {
      fetchMovies(constants.YEAR);
    } else if (query !== '') {
      try {
        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&vote_count.gte=100&query=${query}&page=${page}`;
        if (selectedGenreList.length > 0) {
          const genreQuery = selectedGenreList.join('|');
          apiUrl += `&with_genres=${genreQuery}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
        if (searchQuery === '') {
          fetchMovies(constants.YEAR);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  return (
    <View style={{backgroundColor: '#121212'}}>
      <MovieAppView
        movies={movies}
        handleGenreSelection={handleGenreSelection}
        handleSearch={handleSearch}
        handleScroll={handleScroll}
        flatListRef={flatListRef}
        setMinMaxYear={setMinMaxYear}
        minMaxYear={minMaxYear}
        scrollDir={scrollDir}
      />
    </View>
  );
};

export default MovieApp;
