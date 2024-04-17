const fetchGenreList = async (successCallback, errorCallback) => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d',
    );
    const data = await response.json();
    successCallback(data);
  } catch (error) {
    errorCallback(error);
  }
};

export default fetchGenreList;
