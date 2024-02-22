import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingBottom: 20,
  },

  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flexCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  MarginVer: {
    marginVertical: 7,
  },
  labelCon: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  labelTxt: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: BaseColors.black,
    textTransform: 'capitalize',
    marginRight: 5,
  },
  astrick: {
    fontFamily: FontFamily.medium,
    color: BaseColors.red,
    fontSize: 13,
    position: 'absolute',
    top: -3,
    right: 0,
  },
  labelField: {
    marginVertical: 5,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  Button: {
    marginTop: 10,
  },
  pofileCon: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  Img: {
    height: BaseSetting.nHeight * 0.3,
    width: BaseSetting.nWidth - 40,
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
  uploadSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  errBox: {
    padding: 5,
  },
  errText: {
    color: BaseColors.red,
    fontFamily: FontFamily.medium,
    fontSize: 11,
  },
  vidoeCon: {
    height: BaseSetting.nHeight * 0.3,
    width: BaseSetting.nWidth - 40,
    backgroundColor: BaseColors.black,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  VideoLoader: {
    position: 'absolute',
    zIndex: 10,
  },
  pageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageDot: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: BaseColors.primary,
    marginHorizontal: 3,
  },
  pageDotActive: {
    backgroundColor: BaseColors.primary,
    height: 12,
    width: 12,
  },
  EditIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: BaseColors.black50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: BaseColors.white,
    padding: 3,
    zIndex: 30,
  },
  noData: {
    borderWidth: 1,
    height: BaseSetting.nHeight * 0.3,
    width: BaseSetting.nWidth - 40,
    borderStyle: 'dashed',
    borderColor: BaseColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
