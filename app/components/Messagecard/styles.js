import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

/* CREATED BY SAHIL AHMED ON FEB 13 ============================================== */
export default StyleSheet.create({
  Main: {
    backgroundColor: BaseColors.white,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 12,
    borderColor: BaseColors.black30,
  },
  imgBox: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  Img: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  imgLoader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 20,
  },
  contentBox: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  titleText: {
    textTransform: 'capitalize',
    fontFamily: FontFamily.bold,
    color: BaseColors.secondary,
    fontSize: 15,
    marginRight: 10,
  },
  timeDateText: {
    width: '100%',
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    fontSize: 10,
    textAlign: 'right',
  },
  NewBox: {
    flex: 1,
  },

  NewTag: {
    width: 40,
    backgroundColor: BaseColors.limeGreen,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewTagText: {
    fontFamily: FontFamily.semiBold,
    color: BaseColors.white,
    fontSize: 11,
  },
  titleAgeCon: {
    flexBasis: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightCon: {
    flexBasis: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  messageCon: {
    flexBasis: '75%',
  },
  MsgText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
    fontSize: 12,
  },

  countDot: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.primary,
    borderRadius: 50,
  },
  countTxt: {
    fontFamily: FontFamily.medium,
    color: BaseColors.white,
    fontSize: 11,
  },
  GreenDot: {
    backgroundColor: BaseColors.limeGreen,
    height: 17,
    width: 17,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: BaseColors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  TextSec: {
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
    marginLeft: 5,
    marginRight: 20,
    fontSize: 13,
  },
});
