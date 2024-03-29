import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  header: {
    marginHorizontal: 20,

    marginBottom: 20,
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
  headerBack: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    marginTop: IOS ? 50 : 0,
  },
  container1: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputmain: {
    marginTop: 20,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  continueBtn: {
    margin: 20,
  },
  labelTxt: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: BaseColors.text,
  },
  subContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    // justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  itemBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BaseColors.borderColor,
    width: (Dimensions.get('screen').width - 80) / 2,
    margin: 10,
    alignItems: 'center',
  },
  genderItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    shadowRadius: 4,
    elevation: 20,
    shadowColor: 'rgba(13, 10, 44, 0.08)',
  },
  itemTxt: {
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase',
    color: BaseColors.text,
  },
  itemIco: {
    alignItems: 'center',
    marginTop: 20,
    width: 60,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: BaseColors.primary,
    borderRadius: 100,
    justifyContent: 'center',
  },
  DateText: {
    fontFamily: FontFamily.regular,
    color: BaseColors.primary,
    fontSize: 16,
  },
  inputStyle: {
    marginTop: 10,
    flexDirection: 'row',
    flexShrink: 1,
    height: 52,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BaseColors.black20,
    fontFamily: FontFamily.regular,
  },
  inputTxt: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    paddingLeft: 10,
    color: BaseColors.primary,
    flex: 1,
  },
  flexCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  flexItem: {
    width: '50%',
    marginVertical: 5,
  },
  errorTxt: {
    color: BaseColors.alertRed,
    fontFamily: FontFamily.medium,
    fontSize: 11,
    marginTop: 5,
  },
  titleText: {
    paddingBottom: 5,
    fontFamily: FontFamily.regular,
    color: BaseColors.text,
  },
  modalRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: BaseColors.borderColor,
  },
  modelTxt: {
    textAlign: 'center',
    color: BaseColors.textGrey,
    fontSize: 16,
  },
  Cprofile: {
    flex: 1,
    marginTop: 10,
  },
  avatarSty: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  camBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: BaseColors.primary,
    borderRadius: 10,
    height: 100,
    width: 150,
  },
  mainheading: {
    fontSize: 24,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
    color: BaseColors.secondary,
    fontFamily: FontFamily.bold,
  },
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 23,
  },
  centerTxt: {
    fontSize: 20,
    marginTop: 30,
    marginHorizontal: 20,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    marginBottom: 15,
  },
  centerTxtcookies: {
    fontSize: 15,
    marginHorizontal: 20,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
  },
  label: {
    marginLeft: 15,
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  prize: {
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  centerTxt1: {
    marginTop: 10,
    fontSize: 13,
    marginHorizontal: 24,
    fontFamily: FontFamily.semiBold,
    lineHeight: 23,
    color: BaseColors.black80,
    marginBottom: 15,
  },
  centerTxt3: {
    fontSize: 13,
    marginHorizontal: 24,
    fontFamily: FontFamily.semiBold,
    lineHeight: 23,
    color: BaseColors.black80,
    marginBottom: 15,
  },
  centerTxt2: {
    fontSize: 13,
    lineHeight: 23,
    marginHorizontal: 20,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  buttoncontainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  datePickStyle: {
    alignItems: 'flex-start',
    // height: 30,
    justifyContent: 'center',
    position: 'absolute',
    flex: 1,
    top: 50,
    borderRadius: 10,
    overflow: 'hidden',
    textColor: BaseColors.primary,
  },
  astrick: {
    fontFamily: FontFamily.medium,
    color: BaseColors.red,
    position: 'absolute',
    top: -3,
    right: -5,
  },
  labelCon: {
    alignSelf: 'flex-start',
    marginBottom: 3,
    flexDirection: 'row',
  },

  CheckButton: {
    borderColor: BaseColors.alertRed,
  },
  checkCon: {
    marginTop: 30,
    flexDirection: 'row',
  },
  checkText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
  },
  checkTextColor: {
    color: BaseColors.primary,
  },
  checkTextErr: {
    color: BaseColors.alertRed,
  },
  errBox: {
    padding: 5,
  },
  errText: {
    color: BaseColors.red,
    fontFamily: FontFamily.medium,
    fontSize: 11,
  },
});
