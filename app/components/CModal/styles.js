import { Platform, StatusBar, StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';

const IOS = Platform.OS === 'ios';

const statusBar = IOS ? 30 : StatusBar.currentHeight;

export default StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BaseColors.black60,
  },
  modalMainViewBottom: {
    justifyContent: 'flex-end',
  },
  modalMainViewTop: {
    justifyContent: 'flex-start',
  },
  modalView: {
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    minHeight: BaseSetting.nHeight / 3,
    maxHeight: BaseSetting.nHeight / 2,
    marginHorizontal: 20,
    padding: 20,
    overflow: 'hidden',
  },
  modalViewBottom: {
    minHeight: BaseSetting.nHeight / 4,
    maxHeight: BaseSetting.nHeight * 0.9,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginHorizontal: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  modalViewTop: {
    minHeight: BaseSetting.nHeight / 4,
    maxHeight: BaseSetting.nHeight * 0.9,
    marginHorizontal: 0,
    paddingTop: statusBar + 10,
  },
});
