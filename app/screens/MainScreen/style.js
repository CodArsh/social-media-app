import { Platform, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';
const IOS = Platform.OS === 'ios';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BaseColors.white,
  },
  imgcontainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    height: BaseSetting.nHeight * 0.5,
  },
  profileimage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textcontainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttoncontainer1: {
    marginVertical: 20,
  },
  mainheading: {
    fontSize: 24,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
    color: BaseColors.secondary,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    color: BaseColors.black70,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontFamily: FontFamily.medium,
  },
  Signin: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '60%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: BaseColors.primary,
  },
  Signintext: {
    fontSize: 160,
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  Signup: {
    marginTop: 10,
    padding: 10,
    height: 50,
    borderWidth: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 5,
  },
  Signuptext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Montserrat',
  },
  urlView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  linkText: {
    color: BaseColors.primary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    textDecorationLine: 'underline',
  },
});
