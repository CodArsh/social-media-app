import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import { BaseColors } from '@config/theme';
import styles from './styles';
import BaseSetting from '@config/setting';
import { isEmpty } from 'lodash';
import Translate from '@lang/lang/Translate';

const SearchBar = ({
  onChangeText,
  style,
  inputStyle,
  loading,
  value,
  onSearch,
  onSubmitEditing,
}) => {
  return (
    <View style={[styles.searchCon, style]}>
      <TextInput
        placeholder={Translate('Search')}
        value={value}
        placeholderTextColor={BaseColors.black50}
        cursorColor={BaseColors.primary}
        style={[styles.searchInput, inputStyle]}
        onChangeText={onChangeText}
        numberOfLines={1}
        onSubmitEditing={onSubmitEditing}
      />
      {loading ? (
        <ActivityIndicator style={{ paddingHorizontal: 5 }} />
      ) : (
        !isEmpty(value) &&
        onSearch && (
          <TouchableOpacity
            activeOpacity={BaseSetting.buttonOpacity}
            style={{ paddingHorizontal: 5 }}
            onPress={onSearch}
          >
            <Icon name="search" size={20} color={BaseColors.primary} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default SearchBar;
