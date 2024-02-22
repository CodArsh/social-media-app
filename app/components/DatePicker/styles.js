import { StyleSheet } from 'react-native';

const { default: BaseSetting } = require('@config/setting');
const { BaseColors, FontFamily } = require('@config/theme');

export default StyleSheet.create({
  main: {
    height: BaseSetting.nHeight * 0.06,
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    borderColor: BaseColors.black20,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  DateText: {
    fontFamily: FontFamily.medium,
    color: BaseColors.primary,
  },
  placeholder: {
    fontFamily: FontFamily.medium,
    color: BaseColors.black50,
  },
  Picker: {
    height: 150,
    backgroundColor: BaseColors.white,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 3,
    borderRadius: 50,
  },
});
