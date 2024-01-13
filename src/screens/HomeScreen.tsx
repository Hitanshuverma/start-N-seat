import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something Went Wrong in getNowPlayingMoviesList fn', error);
  }
};

const getUpcomigMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something Went Wrong in getUpcomigMoviesList fn', error);
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something Went Wrong in getPopularMoviesList fn', error);
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setnowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setpopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setupcomingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPLaying = await getNowPlayingMoviesList();
      setnowPlayingMoviesList([{id: 'dummy1'}, ...tempNowPLaying.results, {id: 'dummy2'}]);

      let tempUpcoming = await getUpcomigMoviesList();
      setupcomingMoviesList(tempUpcoming.results);

      let tempPopular = await getPopularMoviesList();
      setpopularMoviesList(tempPopular.results);
    })();
  }, []);

  // console.log(
  //   nowPlayingMovies.length,
  //   popularMovies.length,
  //   upcomingMovies.length,
  // );

  const searchMovieFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMovieFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* contentContainerStyle={styles.scrollViewContainer}> */}
      <StatusBar hidden />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMovieFunction} home = {true} />
      </View>
      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        horizontal={true}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if(!item.original_title){
            return(
              <View style={{
                width : (width - (width * 0.7 + SPACING.space_36 * 2)) / 2
              }}>
              </View>
            )
          }
          return (
            <MovieCard
              shouldMarginAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal={true}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMovies.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal={true}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_16,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
