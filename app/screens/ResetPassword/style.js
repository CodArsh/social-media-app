import { BaseColors, FontFamily } from '@config/theme';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  container1: {
    marginTop: 60,
    alignItems: 'center',
  },
  signintext: {
    color: BaseColors.secondary,
    fontSize: 27,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FontFamily.semiBold,
  },
  subtitleintext: {
    fontSize: 13,
    marginTop: 5,
    color: BaseColors.black70,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FontFamily.semiBold,
  },
  signinbutton: {
    width: Dimensions.get('window').width - 50,
    fontFamily: FontFamily.bold,
    marginTop: 40,
  },
  profileimage: {
    marginTop: 10,
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  signupbuttontext: {
    fontSize: 17,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  inputmain: {
    marginVertical: 40,
    // flex: 2,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  forgotpassword: {
    color: BaseColors.primary,
    fontSize: 9,
    marginTop: 5,
    fontFamily: FontFamily.semiBold,
  },
  input1: {
    borderColor: 'grey',
    height: 50,
    width: Dimensions.get('window').width - 50,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
  },
  container9: {
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    color: BaseColors.primary,
    fontFamily: 'Montserrat',
  },
  signuptext: {
    fontSize: 14,
    marginTop: 20,
    color: BaseColors.primary,
    fontFamily: FontFamily.medium,
  },
  logintext1: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  signup: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  donthaveaccount: {
    color: BaseColors.secondary,
    fontSize: 14,
    marginTop: 20,
    fontWeight: '600',
    fontFamily: FontFamily.medium,
    alignItems: 'flex-end',
  },
  circle: {
    height: 120,
    borderRadius: 60,
    width: 120,
    alignSelf: 'center',
  },
});
