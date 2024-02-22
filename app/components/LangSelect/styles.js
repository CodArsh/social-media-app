import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  optcontainer: {
    flex: 1,
    paddingVertical: 10,
  },
  LoaderCon: {
    height: BaseSetting.nHeight * 0.46,
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    borderColor: BaseColors.black20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  Loader: {
    height: 60,
    width: 60,
  },
  img: {
    height: 30,
    width: 45,
    borderRadius: 5,
  },
  lable: {
    flex: 1,
    marginHorizontal: 10,
    color: BaseColors.secondary,
    fontFamily: FontFamily.medium,
  },
});
