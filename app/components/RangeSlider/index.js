import { View, Text } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import styles from './styles';
import { BaseColors } from '@config/theme';

const RangeSlider = ({
  value = null,
  onValueChange = () => {},
  minimumValue = null,
  maximumValue = null,
  containerStyle = {},
}) => {
  const CustomAboveThumb = index => {
    return (
      <View style={styles.aboveThumb}>
        <Text style={styles.aboveThumbText}>{value && value[index]}</Text>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <Slider
        animateTransitions
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onValueChange={onValueChange}
        step={1}
        trackStyle={styles.track}
        renderAboveThumbComponent={CustomAboveThumb}
        thumbStyle={styles.thumb}
        minimumTrackTintColor={BaseColors.primary}
      />
    </View>
  );
};

export default RangeSlider;
