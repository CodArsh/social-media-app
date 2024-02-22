import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import Button from '@components/Button';
import LabeledInput from '@components/LabeledInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import translate from '../../lang/lang/Translate';
import { isEmpty, isObject } from 'lodash';
import { getApiDataProgress } from '@utils/apiHelper';
import Translate from '../../lang/lang/Translate';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CheckButton from '@components/CheckButton';
import Loader from '@components/Loader/Loader';
import Animated, { FadeIn } from 'react-native-reanimated';

const { setRememberData } = Authentication;

const errorObj = {
  emailErr: false,
  emailMsg: '',
  passErr: false,
  passMsg: '',
};
const SigninScreen = ({ navigation }) => {
  const { rememberData } = useSelector(state => {
    return state.auth;
  });

  const {
    setUserData,
    setAccessToken,
    setIsSubscribe,
    setSubscriptionDetails,
    setEmptyProfile,
  } = Authentication;
  const dispatch = useDispatch();
  const { fcmToken } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState(false);
  const [loginLoader, setloginLoader] = useState(false);
  const [errObj, setErrObj] = useState(errorObj);
  const [loader, setLoader] = useState(false);
  const [hasremember, sethasremember] = useState(
    (isObject(rememberData) && !isEmpty(rememberData)) || false,
  );
  const [email, setEmail] = useState('');
  const platform = Platform.OS;
  let email_Regex = BaseSetting?.emailRegex;

  const checkValidation = () => {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = translate('erroremailmsg');
    } else if (email.includes(' ')) {
      setEmail(email.replace(' ', ''));
    } else if (!isEmpty(email.trim()) && !email_Regex.test(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = translate('wrongemail');
    }
    if (isEmpty(password)) {
      valid = false;
      error.passErr = true;
      error.passMsg = translate('errorpasswordmsg');
    } else if (password.length < 6 || password.length > 15) {
      valid = false;
      error.passErr = true;
      error.passMsg = translate('wrongpassword');
    }
    setErrObj(error);

    if (valid) {
      setErrObj(errorObj);
      handleSubmit(false);
    }
  };

  // set token
  const fcmTokenSetup = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.addToken;
    const params = {
      'UserUuid[uuid]': fcmToken,
      'UserUuid[platform]': platform,
    };
    try {
      const resp = await getApiDataProgress(endPoints, 'POST', params);
      if (resp?.status) {
        navigation.reset({
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:108 ⏩ fcmTokenSetup ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setLoader(false);
    }
  };

  // go to dashboard
  const handleSubmit = async bool => {
    setloginLoader(true);
    setLoader(true);
    let endPoints = `${BaseSetting.endpoints.login}?language_id=${languageData}`;
    const params = {
      'LoginForm[email]': email.trim(),
      'LoginForm[password]': password,
    };

    const rememberd_params = {
      'LoginForm[user_id]': rememberData?.id?.toString(),
    };

    try {
      const resp = await getApiDataProgress(
        endPoints,
        'POST',
        bool ? rememberd_params : params,
      );

      if (resp?.status) {
        dispatch(setUserData(resp?.data));
        dispatch(setAccessToken(resp?.data?.access_token));
        dispatch(setIsSubscribe(resp?.data?.is_subscribed));
        resp?.data?.is_subscribed
          ? dispatch(setSubscriptionDetails(resp?.data?.subscription_detail))
          : dispatch(setSubscriptionDetails({}));
        clearData();
        fcmTokenSetup();

        dispatch(
          setEmptyProfile({
            profile: resp?.data?.profile_empty,
            character: resp?.data?.character_empty,
            interest: resp?.data?.interest_empty,
            preference: resp?.data?.preference_empty,
          }),
        );

        selected &&
          dispatch(
            setRememberData({
              uname: resp.data.name,
              id: resp.data.id,
              photo: resp.data.profile_photo,
            }),
          );
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setLoader(false);
      setloginLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:170 ⏩ handleSubmit ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setLoader(false);
      setloginLoader(false);
    }
  };

  function clearData() {
    setEmail('');
    setPassword('');
    setErrObj(errorObj);
  }

  return (
    <View style={style.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.topcontainer}>
          <Image
            source={Images.logo}
            style={style.profileimage}
            resizeMode="cover"
          />
          <Text style={style.signintext}>{translate('Signin')}</Text>
          {!hasremember ? (
            <Text style={style.subtitleintext}>{translate('subtext')}</Text>
          ) : null}
        </View>
        <View style={style.inputmain}>
          {hasremember ? (
            <View>
              {loginLoader ? (
                <Loader small />
              ) : (
                <>
                  <View style={style.card}>
                    <TouchableOpacity
                      activeOpacity={BaseSetting.buttonOpacity}
                      style={style.imgBox}
                      onPress={() => {
                        handleSubmit(true);
                      }}
                    >
                      <Image
                        source={{
                          uri: rememberData.photo,
                        }}
                        style={style.Img}
                      />
                      <Text style={style.remembertext}>
                        {rememberData.uname}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.imgBox1}>
                    <TouchableOpacity
                      activeOpacity={BaseSetting.buttonOpacity}
                      onPress={() => sethasremember(false)}
                    >
                      <Text style={style.remembersubtext}>
                        {translate('Signin')}&nbsp;
                      </Text>
                    </TouchableOpacity>
                    <Text style={style.remembersubtext1}>
                      {translate('anotheraccount')}
                    </Text>
                  </View>
                </>
              )}
            </View>
          ) : (
            <>
              <LabeledInput
                Label={Translate('EMAIL')}
                placeholder={Translate('emailplaceholder')}
                value={email}
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

              <LabeledInput
                Label={Translate('loginPassword')}
                value={password}
                placeholder={Translate('passwordplaceholder')}
                eyePassword
                onChangeText={value => {
                  setPassword(value);
                  setErrObj({
                    ...errObj,
                    passErr: false,
                    passMsg: '',
                  });
                }}
                showError={errObj.passErr}
                errorText={errObj.passMsg}
              />
              <View style={style.checkbutton}>
                <CheckButton
                  Label={translate('Rememberme')}
                  selected={selected}
                  onPress={() => {
                    setSelected(!selected);
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('ForgotPassword', { from: 'forgot' });
                  }}
                >
                  <Text style={style.forgotpassword}>
                    {translate('loginForgot')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Animated.View entering={FadeIn}>
                <Button
                  title={translate('Signin')}
                  style={style.signinbutton}
                  onPress={checkValidation}
                  loading={loader}
                />
              </Animated.View>
              <View style={style.signup}>
                <Text style={style.donthaveaccount}>
                  {translate("Don'thaveaccount?")}
                  &nbsp;
                </Text>
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                >
                  <Text style={style.signuptext}>
                    {translate('loginToSignup')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.verification}>
                <Text style={style.donthaveaccount}>
                  {translate('resendNotVerified')} &nbsp;
                </Text>
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  onPress={() => {
                    navigation.navigate('ForgotPassword', { from: 'resend' });
                  }}
                >
                  <Text style={style.signuptext}>{translate('reqEmail')}</Text>
                </TouchableOpacity>
              </View>
              <Text style={style.version}>
                {Platform.OS === 'ios' ? 'v1.7' : 'v2.1'}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SigninScreen;
