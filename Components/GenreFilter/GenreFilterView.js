import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './GenreFilterStyle';

const GenreFilterView = ({
  genres,
  handleGenreClick,
  onSearch,
  genreNameList,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MOVIEFLIX</Text>
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor={'white'}
          style={styles.searchInput}
          onChangeText={onSearch}
        />
      </View>
      <FlatList
        data={genres}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleGenreClick(item.id)}
              style={styles.genreButton}>
              <Text
                style={
                  genreNameList.includes(item.id)
                    ? styles.activeText
                    : styles.inactiveText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GenreFilterView;
