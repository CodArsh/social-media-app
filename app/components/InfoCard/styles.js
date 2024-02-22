import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

//  Created By Sahil Ahmes on Feb 12
export const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: BaseColors.white,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
  imgContainer: {
    borderRadius: 10,
    height: BaseSetting.nHeight * 0.23,
    overflow: 'hidden',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  InfoCon: {
    marginTop: 7,
    flexDirection: 'row',
  },
  information: {
    flex: 1,
  },
  PText: {
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    fontSize: 12,
    marginBottom: 3,
  },
  DateLocateCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    fontSize: 12,
  },
  BtnCon: {
    width: '35%',
    paddingTop: 10,
  },
  avatarCon: {
    flexDirection: 'row',
    overflow: 'hidden',
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: -15,
    borderWidth: 2,
    borderColor: BaseColors.white,
  },
  avText: {
    fontFamily: FontFamily.regular,
    color: BaseColors.secondary,
    marginLeft: 15,
  },

  Dot: {
    height: 5,
    width: 5,
    backgroundColor: BaseColors.primary,
    borderRadius: 50,
    marginHorizontal: 7,
  },

  titleCon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
});
