import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../theme/theme';
import SubMovieCard from '../components/SubMovieCard';
import { baseImagePath, searchMovies } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import { RouteProp, useRoute } from '@react-navigation/native';

// interface SearchScreenProps {
//   route: RouteProp<{ params?: { data?: string } }, 'params'>;
// }

const {width, height} = Dimensions.get('window');


const SearchScreen = ({navigation}: any) => {
  // console.log(route.params?.data || ' mmm');
  

  const [searchList, setSearchList] = useState([]);

  const SearchMoviesFunction = async (name :string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results)
    } catch (error) {
      console.error('Something Went Wrong in SearchMoviesFunction fn', error);
    }
  }
  return (
    <View style = {styles.container}>
      <StatusBar hidden/>
      <View>
      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={SearchMoviesFunction} />
      </View>
        }
        contentContainerStyle={styles.centerContainer}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginAtEnd={false}
            shouldMarginAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
          
        )}
      />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    container : {
      display: 'flex',
      flex: 1,
      width,
      alignItems: 'center',
      backgroundColor: COLORS.Black
    },
    InputHeaderContainer: {
      marginHorizontal: SPACING.space_20,
      marginTop: SPACING.space_16,
      marginBottom : SPACING.space_28 - SPACING.space_12
    },
    containerGap36: {
      flex: 1,
      gap: SPACING.space_36,
    },
    centerContainer:{
      alignItems: 'flex-start'
    }
});

export default SearchScreen;