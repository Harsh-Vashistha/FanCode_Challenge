import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import MovieCard from '../MovieCard/MovieCard';
import GenreFilter from '../GenreFilter/GenreFilter';

const MovieAppView = ({
  movies,
  handleGenreSelection,
  handleSearch,
  flatListRef,
  handleScroll,
  setMinMaxYear,
  minMaxYear,
  scrollDir,
}) => {
  return (
    <>
      <GenreFilter
        onGenreSelect={handleGenreSelection}
        onSearch={handleSearch}
      />
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={({item, index}) => {
          return (
            <MovieCard
              key={`${item.id}_${item.popularity}_${item.poster_path}_${item.vote_count}_${item.original_title}`}
              movie={item}
              setMinMaxYear={setMinMaxYear}
              index={index}
              moviesLength={movies.length}
              minMaxYear={minMaxYear}
              scrollDir={scrollDir}
            />
          );
        }}
        keyExtractor={item =>
          `${item.id}_${item.popularity}_${item.poster_path}_${item.vote_count}_${item.original_title}`
        }
        onStartReachedThreshold={0}
        onEndReachedThreshold={1}
        disableIntervalMomentum={true}
        onScroll={handleScroll}
        windowSize={50}
        showsVerticalScrollIndicator={true}
        enableAutoscrollToTop={false}
      />

      {movies.length > 0 ? (
        <Text style={styles.noResults}>No Results Found.</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  noResults: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MovieAppView;
