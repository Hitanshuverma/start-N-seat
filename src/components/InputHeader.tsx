import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Customicon from './Customicon';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return props.home ? (
    <TouchableOpacity
      onPress={() => {
        props.searchFunction(searchText)
      }}>
      <View style={[styles.inputbox]}>
        <Text
          style={[
            styles.textInput,
            {
              color: COLORS.WhiteRGBA32,
              paddingVertical: SPACING.space_12,
              paddingHorizontal: SPACING.space_2,
            },
          ]}>
          Search Your Movies...
        </Text>
        <TouchableOpacity
          style={[styles.searchIcon]}
          onPress={() => props.searchFunction(searchText)}>
          <Customicon
            name="search"
            color={COLORS.Orange}
            size={FONTSIZE.size_20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.inputbox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)}
        placeholder="Search Your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
        selectionColor={COLORS.Orange}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <Customicon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputbox: {
    display: 'flex',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_28,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '95%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
