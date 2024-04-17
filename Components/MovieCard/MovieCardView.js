import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './MovieCardStyle';

const MovieCardView = ({
  movie = [],
  genres,
  credits,
  director,
  handleImageError,
}) => {
  return (
    <View style={styles.movieCard}>
      <View style={styles.ratingCircle}>
        <Text style={styles.darkText}>{`Rating : ${movie.vote_average}`}</Text>
      </View>
      <Image
        style={styles.moviePoster}
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
            : 'https://via.placeholder.com/200x300',
        }}
        onError={handleImageError}
        alt={movie.title}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <View style={styles.movieDetails}>
        <Text style={styles.movieOverview}>{movie.overview}</Text>
        <View style={styles.movieMetadata}>
          <Text style={styles.lightText}>
            <Text style={styles.metadataTitle}>Release Year:</Text>
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : 'Not available'}
          </Text>
          <Text style={styles.lightText}>
            <Text style={styles.metadataTitle}>Genres:</Text>
            {genres.map(genre => genre.name).join(', ')}
          </Text>
          <Text style={styles.lightText}>
            <Text style={styles.metadataTitle}>Director:</Text>
            {director?.name ? director.name : 'not available'}
          </Text>
          {credits.length > 0 && (
            <Text style={styles.lightText}>
              <Text style={styles.metadataTitle}>Cast:</Text>{' '}
              {credits.map(actor => actor.name).join(', ')}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MovieCardView;
