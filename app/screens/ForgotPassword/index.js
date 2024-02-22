import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import Button from '@components/Button';
import LabeledInput from '@components/LabeledInput';
import { Images } from '@config';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { isEmpty } from 'lodash';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Translate from '../../lang/lang/Translate';
import { getApiDataProgress } from '@utils/apiHelper';
import { BaseColors, FontFamily } from '@config/theme';
import { useSelector } from 'react-redux';
const errorObj = {
  emailErr: false,
  emailMsg: '',
};
const ForgotPassword = ({ navigation, route }) => {
  const emailVerification = route?.params?.from === 'resend';
  const { languageData } = useSelector(state => state.language);
  const [email, setEmail] = useState('');
  const [errObj, setErrObj] = useState(errorObj);
  const [forgotEmail, setForgotEmail] = useState(false);
  const [loader, setLoader] = useState(false);
  let email_Regex = BaseSetting?.emailRegex;
  const checkValidation = () => {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = translate('erroremailmsg');
    } else if (!isEmpty(email.trim()) && !email_Regex.test(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = translate('wrongemail');
    }
    setErrObj(error);
    if (valid) {
      setErrObj(errorObj);
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    setLoader(true);
    const params = {
      'PasswordResetRequestForm[email]': email.trim(),
    };
    const resendParams = {
      'ResendVerificationEmailForm[email]': email.trim(),
    };
    try {
      const resp = await getApiDataProgress(
        emailVerification
          ? `${BaseSetting.endpoints.resendEmail}?language_id=${languageData}`
          : `${BaseSetting.endpoints.forgotPassword}?language_id=${languageData}`,
        'POST',
        emailVerification ? resendParams : params,
      );
      if (resp?.status) {
        setForgotEmail(true);
        clearData();
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:65 ⏩ handleSubmit ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setLoader(false);
    }
  };
  function clearData() {
    setEmail('');
    setErrObj(errorObj);
  }

  return (
    <View style={style.container}>
      <View style={style.container1}>
        <Image
          source={Images.logo}
          style={style.profileimage}
          resizeMode="contain"
        />
        <Text style={style.signintext}>
          {emailVerification
            ? translate('resendEmail')
            : Translate('loginForgot')}
        </Text>
        <Text style={style.subtitleintext}>
          {emailVerification
            ? translate('resendDesc')
            : Translate('resetpassword')}
        </Text>
      </View>
      {forgotEmail ? (
        <View style={{ flex: 1, marginBottom: 20 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: BaseColors.primary,
              marginTop: 20,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: BaseColors.primary,
              }}
            >
              {!emailVerification && (
                <Text
                  style={{
                    color: BaseColors.white,
                    fontFamily: FontFamily.semiBold,
                    marginTop: 10,
                    letterSpacing: 2,
                  }}
                >
                  {translate('resquestedForgotTitle')}
                </Text>
              )}
              <Text
                style={{
                  color: BaseColors.white,
                  fontFamily: FontFamily.bold,
                  fontSize: 22,
                  marginVertical: 10,
                }}
              >
                {translate('checkEmailLabel')}
              </Text>
            </View>
            {!emailVerification && (
              <View
                style={{
                  paddingVertical: 20,
                }}
              >
                <Text style={[style.labelTxt, { textAlign: 'center' }]}>
                  {translate('resetpassword')}
                </Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginBottom: 20,
          }}
        >
          <View style={style.passwordFlex}>
            <View>
              <LabeledInput
                Label={Translate('EMAIL')}
                value={email}
                placeholder={Translate('emailplaceholder')}
                onChangeText={value => {
                  setEmail(value);
                  setErrObj({
                    ...errObj,
                    emailErr: false,
                    emailMsg: '',
                  });
                }}
                showError={errObj.emailErr}
                errorText={errObj.emailMsg}
              />
              <Button
                onPress={() => {
                  checkValidation();
                }}
                title={translate('Submit')}
                style={[style.passbutton]}
                loading={loader}
              />
            </View>
            <View style={style.signup}>
              <Text style={style.donthaveaccount}>
                {emailVerification
                  ? translate('resendAlready')
                  : translate("Don'thaveaccount?")}
                &nbsp;
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    emailVerification ? 'SigninScreen' : 'SignUp',
                  )
                }
              >
                <Text style={style.signuptext}>
                  &nbsp;
                  {emailVerification
                    ? translate('Signin')
                    : translate('loginToSignup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ForgotPassword;
