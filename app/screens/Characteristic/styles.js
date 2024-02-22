import { BaseColors } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingBottom: 20,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  marginVer: {
    marginVertical: 7,
  },
});
