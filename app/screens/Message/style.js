import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  container2: {
    height: 20,
  },
  editBtnCon: {
    height: 28,
    width: 28,
    borderWidth: 1,
    borderColor: BaseColors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
  SearchBar: {
    marginHorizontal: 20,
  },
  flatCon: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  flatList: {
    flexGrow: 1,
  },
  footer: {
    height: 20,
    backgroundColor: BaseColors.white,
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
  chatCards: {
    position: 'relative',
    borderColor: BaseColors.black30,
    paddingHorizontal: 20,
  },
  lockIcon: {
    position: 'absolute',
    top: 7,
    left: 7,
    zIndex: 3,
  },
  modalCon: {
    borderTopRightRadius: 25,
  },
  btnStyleDel: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'space-evenly',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  modalText1: {
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    color: BaseColors.secondary,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 40,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
