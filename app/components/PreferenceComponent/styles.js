import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  labelCon: {
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  labelTxt: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: BaseColors.black,
    textTransform: 'capitalize',
    marginRight: 5,
  },
  labelField: {
    marginVertical: 7,
  },
  ageLabel: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  marginVer: {
    marginVertical: 7,
  },

  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
});
