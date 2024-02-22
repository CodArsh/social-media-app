import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const windowHeight = BaseSetting.nHeight;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  images: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  getPics: {
    height: BaseSetting.nWidth / 2,
    width: BaseSetting.nWidth / 2.3,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  LoaderCon: {
    flex: 1,
    marginTop: BaseSetting.nHeight / 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  icon: {
    backgroundColor: BaseColors.primary,
    margin: 5,
    borderRadius: 50,
  },
  iconTouch: {
    backgroundColor: BaseColors.primary,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
  },
  InfoCard: {
    width: BaseSetting.nWidth / 2 - 28,
  },
  emptyPics: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: BaseSetting.nHeight / 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  popup: {
    elevation: 5,
    marginRight: 25,
    backgroundColor: 'white',
    position: 'absolute',
    width: 180,
    top: windowHeight / 25,
    right: 2,
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 50,
  },
  closeButton: {
    color: BaseColors.primary,
  },
  desc: {
    color: BaseColors.secondary,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  popupText: {
    color: BaseColors.primary,
    marginVertical: 6,
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
  multi: {
    fontSize: 18,
    marginHorizontal: 20,
    marginTop: 25,
    color: BaseColors.secondary,
    fontFamily: FontFamily.medium,
  },
  deleteImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalStyle: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  topTitle: {
    color: BaseColors.secondary,
    fontSize: 20,
    fontFamily: FontFamily.medium,
    marginBottom: 10,
  },
  btnIn: { paddingHorizontal: 15, width: 150 },
});
