import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { StyleSheet } from 'react-native';
const commonHeight = BaseSetting.nHeight * 0.11;
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  flatContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderFooterView: {
    paddingBottom: 25,
  },
  footer: {
    height: 25,
  },
  blankData: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenView: {
    height: commonHeight,
    borderColor: BaseColors.black20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  hiddenBtn: {
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 10,
    borderColor: BaseColors.red,
  },
});
