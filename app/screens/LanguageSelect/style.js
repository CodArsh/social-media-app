import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
  },
  container1: {
    marginTop: BaseSetting.nHeight * 0.08,
    alignItems: 'center',
  },
  profileimage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  centerTxt: {
    textAlign: 'center',
    fontFamily: FontFamily.bold,
    color: BaseColors.secondary,
  },
});
