import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingBottom: 20,
  },
  imgcontainer: {
    height: BaseSetting.nHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Pname: {
    marginTop: 10,
    fontSize: 17,
    color: BaseColors.secondary,
    fontFamily: FontFamily.bold,
  },
  settigCon: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  version: { textAlign: 'center', marginTop: 5, color: BaseColors.black90 },
  settingItem: {
    height: BaseSetting.nHeight * 0.067,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: BaseColors.black20,
  },
  settingItemText: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
  },
  leftImagem: { height: 20, width: 22 },
  deletecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  deleteText: {
    fontSize: 15,
    color: BaseColors.red,
    fontFamily: FontFamily.medium,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 40,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnStyle: {
    flexBasis: '47%',
  },
});
