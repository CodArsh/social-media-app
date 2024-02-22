import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxCon: {
    height: 20,
    width: 20,
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BaseColors.black20,
    elevation: 1,
    borderRadius: 2,
  },
  selected: {
    backgroundColor: BaseColors.primary,
    borderColor: BaseColors.primary,
  },
  labelText: {
    textTransform: 'capitalize',
    fontFamily: FontFamily.medium,
    marginLeft: 8,
    color: BaseColors.secondary,
  },
});
