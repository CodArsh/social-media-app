import { Dimensions, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';
const commonHeight = BaseSetting.nHeight * 0.11;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  main: { flex: 1, backgroundColor: BaseColors.white, marginHorizontal: 10 },
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  clearall: {
    color: BaseColors.primary,
    fontFamily: FontFamily.medium,
  },
  twoBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  blankData: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIn: { paddingHorizontal: 15, width: 150 },
  deleteImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  topTitle: {
    color: BaseColors.secondary,
    fontSize: 20,
    fontFamily: FontFamily.medium,
    marginBottom: 10,
  },
  setText: { paddingLeft: 12, marginVertical: 10 },
  setWidth: { width: BaseSetting.nWidth / 2.4 },
  flatContainer: {
    flex: 1,
    marginTop: 10,
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
  hiddenView: {
    height: commonHeight,
    borderColor: BaseColors.black20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 15,
  },
  hiddenBtn: {
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 10,
    borderColor: BaseColors.red,
  },
  modalStyle: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  popup: {
    backgroundColor: 'white',
    position: 'absolute',
    width: BaseSetting.nWidth / 2,
    top: windowHeight / 25,
    right: 2,
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  closeButton: {
    color: BaseColors.primary,
  },
  popupText: {
    color: BaseColors.secondary,
    marginVertical: 6,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  desc: {
    color: BaseColors.secondary,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  deleteOp: {
    marginTop: -35,
    paddingRight: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btnStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 25,
  },
  headLine: {
    alignSelf: 'center',
    height: 5,
    width: 70,
    backgroundColor: BaseColors.primary,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  modal: {
    paddingTop: 5,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  modalTitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 15,
    color: BaseColors.secondary,
    fontFamily: FontFamily.bold,
  },
  uploadSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: BaseColors.black20,
    paddingVertical: 20,
  },
  SelectText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: BaseColors.secondary,
    marginHorizontal: 10,
  },
  reloadText: {
    backgroundColor: BaseColors.primary,
    padding: 5,
    width: 100,
    alignItems: 'center',
    borderRadius: 50,
  },
  load: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
