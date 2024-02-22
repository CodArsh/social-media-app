import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },

  ScrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  flexCon: {
    marginTop: 20,
  },
  flexItem: {
    flexBasis: '48%',
    marginVertical: 5,
  },
});
