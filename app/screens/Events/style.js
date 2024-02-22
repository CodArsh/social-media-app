import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  main: {
    flex: 1,
    backgroundColor: BaseColors.white,
    marginHorizontal: 10,
  },
  blankData: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchBar: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  FlatList: {
    paddingHorizontal: 20,
  },

  footer: {
    height: 25,
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
});
