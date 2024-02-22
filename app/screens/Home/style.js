import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  page: {
    flex: 1,
  },
  InfoCard: {
    width: BaseSetting.nWidth / 2 - 30,
    margin: 5,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchBar: {
    flex: 1,
  },
  searchMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },

  setMenuCon: {
    height: BaseSetting.nHeight * 0.05,
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    borderColor: BaseColors.black20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginLeft: 15,
  },
  FlatList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  chipStyle: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 10,
    elevation: 2,
    marginRight: 5,
  },
  chipText: {
    fontSize: 10,
  },
  modalcontainer1: {
    alignItems: 'center',
  },
  modaltext: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: BaseColors.secondary,
  },
  modalsubtext: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    marginTop: 5,
    marginBottom: 20,
  },
  centerTxt: {
    fontSize: 20,
    marginTop: 15,
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
  labelval: {
    marginLeft: 15,
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  centerTxt1: {
    marginTop: 10,
    fontSize: 14,
    marginHorizontal: 23,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black80,
    marginBottom: 15,
  },
  centerTxt2: {
    fontSize: 12,
    marginHorizontal: 23,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 10,
    marginTop: 20,
  },

  loaderFooterView: {
    paddingBottom: 25,
  },
  footer: {
    height: 25,
  },
  round: {
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  month: {
    borderWidth: 1,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'relative',
  },
  blur: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  modalMainView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: BaseColors.black60,
  },
  modalView: {
    flex: 1,
    backgroundColor: BaseColors.white,
    padding: 20,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
});
