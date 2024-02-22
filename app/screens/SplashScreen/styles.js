import { Dimensions, Platform, StyleSheet } from 'react-native';
import { isIPhoneX } from 'react-native-status-bar-height';
import { BaseColors } from '@config/theme';

const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainCon: {
    flex: 1,
    backgroundColor: BaseColors.white,
    justifyContent: 'center',
  },
  centerCon: {
    backgroundColor: BaseColors.white,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: { width: 200, marginLeft: 10, marginVertical: 50, zIndex: 1 },
  lottie: {
    backgroundColor: 'red',
    flex: 1,
    zIndex: 1,
  },
});
