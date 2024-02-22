import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  aboveThumb: {
    height: 30,
    width: 30,
    backgroundColor: BaseColors.white,
    marginBottom: -10,
    marginLeft: -15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BaseColors.primary,
    shadowColor: BaseColors.primary,
    elevation: 10,
  },
  aboveThumbText: {
    fontFamily: FontFamily.medium,
    color: BaseColors.primary,
  },
  track: {
    backgroundColor: BaseColors.white,
    borderRadius: 5,
    height: 10,
    shadowColor: BaseColors.secondary,
    elevation: 1,
    borderWidth: 1,
    borderColor: BaseColors.black10,
  },
  thumb: {
    backgroundColor: BaseColors.white,
    borderRadius: 50,
    height: 20,
    width: 12,
    borderWidth: 1,
    borderColor: BaseColors.primary,
  },
});
