import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BaseColors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 20,
    marginBottom: 40,
  },
  textcontainer: {
    width: '80%',
    alignItems: 'center',
  },
  matchTxt: {
    fontSize: 25,
    fontFamily: FontFamily.bold,
    color: BaseColors.primary,
  },
  realHeart: {
    position: 'absolute',
    top: 20,
    left: 25,
  },
  percentage: {
    top: BaseSetting.nHeight * 0.27,
    position: 'absolute',
    justifyContent: 'center',
    left: BaseSetting.nWidth * 0.33,
    height: BaseSetting.nWidth * 0.15,
    width: BaseSetting.nWidth * 0.15,
    borderWidth: 5,
    borderColor: BaseColors.primary,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  percentagetext: {
    color: BaseColors.black90,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FontFamily.bold,
  },
  smileHeart: {
    borderWidth: 1,
    top: BaseSetting.nHeight * 0.48,
    position: 'absolute',
    right: 40,
  },
  loveChat: {
    top: 15,
    left: 260,
    position: 'absolute',
  },

  blackHeart: {
    top: 70,
    left: 360,
    position: 'absolute',
  },
  darkHeart: {
    top: 330,
    position: 'absolute',
    left: 80,
  },
  redHeart: {
    left: 50,
    top: 320,
    position: 'absolute',
  },
  circle: {
    height: 120,
    borderRadius: 60,
    width: 120,
    alignSelf: 'center',
  },

  imgcontainer1: {
    flex: 1,
    padding: 20,
    width: BaseSetting.nWidth,
    height: BaseSetting.nHeight / 2,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  profileimage: {
    backgroundColor: BaseColors.primary,
    width: '35%',
    height: '35%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderBottomRightRadius: 10,
  },
  subtitleintext: {
    fontSize: 18,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    lineHeight: 25,
    color: BaseColors.secondary,
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
  },
  profileimage2: {
    alignSelf: 'flex-end',
    width: '35%',
    height: '35%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    backgroundColor: BaseColors.primary,
  },
  matchcontainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttoncontainer1: {
    width: '100%',
    marginTop: 30,
  },
  container1: {
    marginTop: 60,
    alignItems: 'center',
  },
  lottie: {
    backgroundColor: 'red',
    flex: 1,
    zIndex: 1,
  },
  modalcontainer1: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    color: BaseColors.black90,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
});
