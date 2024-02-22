import { StyleSheet, Platform } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const windowHeight = BaseSetting.nHeight;
const IOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  MT10: {
    position: 'relative',
    borderRadius: 10,
    // paddingBottom: -25,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  prBorderSetup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    // borderBottomColor: '#4357E0',
    // borderBottomWidth: 1,
    // marginBottom: 25,
  },
  mainViewSty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderRadius: 5,
    width: '100%',
    // height: windowHeight/12
  },
  leftIconViewSty: {
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    color: BaseColors.white,
  },
  countryPickerView: {
    marginRight: 10,
    marginTop: 13,
  },
  codeTextStyle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    paddingBottom: IOS ? 10 : 0,
  },
  commonInputTextSty: {
    height: '100%',
    fontSize: 12,
    fontFamily: FontFamily.medium,
    paddingLeft: 10,
    color: BaseColors.primary,
  },
  commonInputHeaderText: {
    backgroundColor: '#0000',
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.3,
    color: '#000',
  },
  search: {
    fontSize: IOS ? 20 : 25,
    padding: 10,
    color: BaseColors.white,
  },
  errorTxt: {
    color: '#FF0B1E',
    paddingLeft: 5,
    paddingBottom: 12,
    marginTop: -5,
    fontFamily: FontFamily.medium,
    fontSize: 11,
  },
});

export default styles;
