import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';

const CheckButton = ({
  Label = '',
  onPress = () => {},
  BoxStyle,
  TextStyle,
  selected,
  checkButtonStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={BaseSetting.buttonOpacity}
      style={[styles.main, BoxStyle]}
      onPress={onPress}
    >
      <View
        style={[styles.boxCon, checkButtonStyle, selected && styles.selected]}
      >
        <Icon name="check" size={17} color={BaseColors.white} />
      </View>
      <Text style={[styles.labelText, TextStyle]}>{Label}</Text>
    </TouchableOpacity>
  );
};

export default CheckButton;
