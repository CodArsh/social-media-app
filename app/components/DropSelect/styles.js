import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  Main: {
    width: '100%',
  },
  DropDown: {
    minHeight: 50,
    maxHeight: BaseSetting.nHeight * 0.15,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 10,
    backgroundColor: BaseColors.re,
    overflow: 'hidden',
    borderColor: BaseColors.black20,
  },
  DropArea: {
    backgroundColor: BaseColors.white,
    minHeight: BaseSetting.nHeight * 0.07,
    maxHeight: BaseSetting.nHeight / 2,
    width: '100%',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
  searchBox: {
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: FontFamily.medium,
    color: BaseColors.primary,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: BaseColors.black20,
  },
  ItemView: {
    backgroundColor: BaseColors.black10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedItem: {
    backgroundColor: BaseColors.primary,
  },
  ChipContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  IconContainer: {
    alignSelf: 'center',
    // marginLeft: 5,
    // marginTop: 10,
  },
  ItemText: {
    color: BaseColors.secondary,
    fontFamily: FontFamily.medium,
    fontSize: 15,
  },
  selectedText: {
    color: BaseColors.white,
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
    position: 'absolute',
    top: -3,
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
  placeholder: {
    fontFamily: FontFamily.medium,
    color: BaseColors.black50,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
});
