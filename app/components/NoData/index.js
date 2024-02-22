import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseColors } from '@config/theme';
import translate from '../../lang/lang/Translate';
/**
 * Component for GradientContainer
 *@function NoDataFound
 */
export default function NoDataFound({ style }) {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BaseColors.white,
        },
        style,
      ]}
    >
      <View
        style={{
          borderColor: BaseColors.primary,
          borderWidth: 2,
          borderRadius: 5,
          height: 150,
          width: 90,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="trash-bin" size={50} color={BaseColors.primary} />
      </View>
      <Text style={{ fontSize: 25, marginTop: 15, color: BaseColors.primary }}>
        {translate('nData')}
      </Text>
    </View>
  );
}
