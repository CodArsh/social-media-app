import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { BaseColors } from '@config/theme';
import translate from '../../lang/lang/Translate';
const NewUser = () => {
  return (
    <View style={styles.main}>
      <Text style={{ color: BaseColors.primary, fontSize: 11 }}>
        {translate('newUser')}
      </Text>
    </View>
  );
};

export default NewUser;
export const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    zIndex: 5,
    right: 5,
    bottom: 30,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: BaseColors.primary,
  },
});
