import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  searchCon: {
    height: BaseSetting.nHeight * 0.05,
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
  searchInput: {
    height: '100%',
    flex: 1,
    padding: 0,
    marginLeft: 10,
    color: BaseColors.primary,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
});
