import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';

const commonHeight = BaseSetting.nHeight * 0.11;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  flatContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  loaderFooterView: {
    paddingBottom: 25,
  },
  MessageCard: {
    height: commonHeight,
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
