import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={props.cardFunction}>
      <View
        style={[
          styles.container,
          props.shouldMarginAtEnd
            ? props.isFirst
              ? {marginLeft: SPACING.space_36}
              : props.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
            props.shouldMarginAround ? {margin : SPACING.space_12} : {},
            {maxWidth: props.cardWidth}
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{
            uri: props.imagePath,
          }}
        />
        <Text numberOfLines={1} style = {styles.textTitle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  textTitle : {
    fontFamily : FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign : 'center',
    paddingVertical : SPACING.space_10
  },
});
