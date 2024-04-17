import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    padding: 10,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  genreButton: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#CCCCCC',
  },
});

export default styles;
