import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
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
  InfoCard: {
    width: BaseSetting.nWidth / 2 - 25,
    margin: 5,
  },
  FlatList: {
    paddingHorizontal: 20,
  },
  footer: {
    height: 25,
  },
  loaderFooterView: {
    paddingBottom: 25,
  },
});
