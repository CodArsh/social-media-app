import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: BaseColors.transparent,
  },
  mainSquare: {
    borderRadius: 5,
  },
  mainRound: {
    borderRadius: 50,
  },
  mainPrimary: {
    backgroundColor: BaseColors.primary,
  },
  mainOutlind: {
    borderWidth: 1,
    borderColor: BaseColors.primary,
    backgroundColor: BaseColors.white,
  },

  Dtext: {
    fontFamily: FontFamily.medium,
    textTransform: 'capitalize',
    color: BaseColors.primary,
  },
  PrimaryText: {
    color: BaseColors.white,
  },
  outlinedText: {
    color: BaseColors.primary,
  },

  cancelBtn: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: BaseColors.white,
    borderRadius: 50,
  },
});
