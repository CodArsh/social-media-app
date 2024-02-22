import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  listItem: {
    justifyContent: 'center',
    borderColor: BaseColors.black20,
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  ItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.medium,
    color: BaseColors.primary,
  },
  detailText: {
    flexBasis: '100%',
    width: BaseSetting.nWidth - 50,
    lineHeight: 24,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
    marginVertical: 10,
  },

  titleIconCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
