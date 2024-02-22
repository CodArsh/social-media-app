import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titles: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: BaseColors.secondary,
    textTransform: 'capitalize',
    marginTop: 20,
    marginBottom: 12,
  },
  descText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    color: BaseColors.secondary,
  },
  iconTextCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  EventSeeAllCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    marginTop: 20,
    marginBottom: 12,
  },
  InfoCard: {
    width: BaseSetting.nWidth * 0.4,
  },
  InfoImg: {
    height: BaseSetting.nWidth * 0.25,
  },
});
