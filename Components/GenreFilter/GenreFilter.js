import React, {useState, useEffect} from 'react';
import fetchGenreList from '../../utils/fetchGenreList';
import GenreFilterView from './GenreFilterView';

const GenreFilter = ({onGenreSelect, onSearch}) => {
  const [genres, setGenres] = useState([]);
  const [genreNameList, setGenreNameList] = useState([]);

  useEffect(() => {
    fetchGenreList(
      (successCallback = data => {
        setGenres(data.genres);
      }),
      (errorCallback = error => {
        console.error('Error fetching genre list:', error);
      }),
    );
  }, []);

  const handleGenreClick = genreId => {
    genreId = !genreId ? null : genreId;
    let genreNameListCopy = [...genreNameList];
    if (genreNameListCopy.indexOf(genreId) !== -1) {
      if (genreId !== null || genreNameList.length > 1) {
        genreNameListCopy.splice(genreNameListCopy.indexOf(genreId), 1);
      }
    } else {
      genreNameListCopy.push(genreId);
    }
    if (genreNameListCopy.length === 0) {
      genreNameListCopy.push(null);
    }
    setGenreNameList(genreNameListCopy);
    onGenreSelect(genreNameListCopy);
  };

  return (
    <GenreFilterView
      genres={genres}
      handleGenreClick={handleGenreClick}
      onSearch={onSearch}
      genreNameList={genreNameList}
    />
  );
};

export default GenreFilter;
