import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  container: {
    flexGrow: 1,
    backgroundColor: BaseColors.white,
  },

  addBtn: {
    marginTop: 10,
    borderColor: BaseColors.black,
    color: BaseColors.black,
  },

  modalStyle: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },

  modalcontainer1: {
    alignItems: 'center',
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
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
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 20,
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
    marginBottom: 10,
    color: BaseColors.secondary,
  },
  btnStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 25,
  },

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
  month: {
    borderWidth: 1,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  btnIn: { paddingHorizontal: 15, width: 150 },
  label: {
    marginLeft: 15,
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  label1: {
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
    textAlign: 'right',
  },
  labelval: {
    marginLeft: 15,
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  labelval1: {
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  button: {
    paddingVertical: 10,
    marginTop: 20,
  },
  expiry: {
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.white,
    padding: 4,
    borderRadius: 4,
    backgroundColor: BaseColors.primary,
  },
});
