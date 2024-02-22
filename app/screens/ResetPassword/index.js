import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import Button from '@components/Button';
import LabeledInput from '@components/LabeledInput';
import { Images } from '@config';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { isEmpty } from 'lodash';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getApiDataProgress } from '@utils/apiHelper';
import { useSelector } from 'react-redux';
const errorObj = {
  passErr: false,
  passMsg: '',
  cpassErr: false,
  cpassMsg: '',
};

const ResetPassword = ({ navigation, route }) => {
  const { languageData } = useSelector(state => state.language);
  const fromLinkingToken = route?.params?.token || '';
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errObj, setErrObj] = useState(errorObj);
  const [btnLoader, setBtnLoader] = useState(false);
  const checkValidation = () => {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(password)) {
      valid = false;
      error.passErr = true;
      error.passMsg = translate('errorpasswordmsg');
    } else if (password.length < 6 || password.length > 15) {
      valid = false;
      error.passErr = true;
      error.passMsg = translate('wrongpassword');
    }

    if (isEmpty(confirmpassword)) {
      valid = false;
      error.cpassErr = true;
      error.cpassMsg = translate('errorpasswordmsg');
    } else if (confirmpassword.length < 6 || confirmpassword.length > 15) {
      valid = false;
      error.cpassErr = true;
      error.cpassMsg = translate('wrongpassword');
    } else if (confirmpassword !== password) {
      valid = false;
      error.cpassErr = true;
      error.cpassMsg = translate('passmatchErr');
    }

    setErrObj(error);

    if (valid) {
      setErrObj(errorObj);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setBtnLoader(true);
    const endPoints = `${BaseSetting.endpoints.resetpassword}?token=${fromLinkingToken}?language_id=${languageData}`;
    const params = {
      'ResetPasswordForm[password]': password,
    };

    try {
      const resp = await getApiDataProgress(endPoints, 'POST', params);
      if (resp?.status) {
        Toast.show({
          text1: resp?.message?.toString(),
          type: 'success',
        });
        navigation.reset({
          routes: [{ name: 'SigninScreen' }],
        });
        setBtnLoader(false);
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
        setBtnLoader(false);
      }
      setBtnLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:88 ⏩ handleSubmit ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setBtnLoader(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={style.container}>
      <View style={style.container1}>
        <Image
          source={Images.logo}
          style={style.profileimage}
          resizeMode="cover"
        />
        <Text style={style.signintext}>{translate('resetpasswordTitle')}</Text>
      </View>
      <View style={style.inputmain}>
        <LabeledInput
          value={password}
          Label={translate('newpassword')}
          placeholder={translate('passwordplaceholder')}
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
        <LabeledInput
          value={confirmpassword}
          Label={translate('loginCPassword')}
          placeholder={translate('passwordplaceholder')}
          eyePassword
          onChangeText={value => {
            setConfirmpassword(value);
            setErrObj({
              ...errObj,
              cpassErr: false,
              cpassMsg: '',
            });
          }}
          showError={errObj.cpassErr}
          errorText={errObj.cpassMsg}
        />
        {/* <Button style={style.signinbutton}>{translate('loginBtn')}</Button> */}
        <Button
          title={translate('continue')}
          style={style.signinbutton}
          onPress={checkValidation}
          loading={btnLoader}
        />
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
