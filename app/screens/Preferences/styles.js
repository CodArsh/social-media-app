import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
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
  genderCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderBox: {
    flexBasis: '31%',
    borderWidth: 1,
    borderColor: BaseColors.black20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  genderText: {
    fontFamily: FontFamily.medium,
    color: BaseColors.secondary,
    marginTop: 7,
  },
  genderSelected: {
    borderColor: BaseColors.primary,
  },
  LoaderCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  errBox: {
    padding: 5,
  },
  errText: {
    color: BaseColors.red,
    fontFamily: FontFamily.medium,
    fontSize: 11,
  },
});
