import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  movieCard: {
    backgroundColor: '#121212',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333333',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  darkText: {
    color: 'black',
  },
  lightText: {
    color: 'white',
  },
  ratingCircle: {
    flex: 1,
  },
  moviePoster: {
    width: 200,
    height: 300,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFFFFF',
  },
  movieDetails: {
    marginTop: 10,
  },
  movieOverview: {
    marginBottom: 10,
    color: '#CCCCCC',
  },
  movieMetadata: {
    marginTop: 5,
  },
  metadataTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default styles;
