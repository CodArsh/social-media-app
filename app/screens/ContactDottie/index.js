import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import LabeledInput from '@components/LabeledInput';
import { isEmpty } from 'lodash';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import Button from '@components/Button';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const errorObj = {
  emailErr: false,
  emailErrMsg: '',
  NameErr: false,
  NameErrMsg: '',
  MessageErr: false,
  MessageErrMsg: '',
};
const ContactDottie = ({ navigation }) => {
  const [ErrObj, setErrObj] = useState(errorObj);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [NameVal, setNameVal] = useState('');
  const [MessageVal, setMessageVal] = useState('');
  const [email, setEmail] = useState('');

  let email_Regex = BaseSetting?.emailRegex;
  const checkValidation = () => {
    const error = { ...ErrObj };
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

    if (isEmpty(NameVal)) {
      valid = false;
      error.NameErr = true;
      error.NameErrMsg = translate('EnterName');
    }
    if (isEmpty(MessageVal)) {
      valid = false;
      error.MessageErr = true;
      error.MessageErrMsg = translate('enterMsg');
    }
    setErrObj(error);

    if (valid) {
      ContactData();
    }
  };
  const ContactData = async () => {
    setBtnLoader(true);
    const endPoint = BaseSetting.endpoints.contactDottie;
    const params = {
      'ContactUs[name]': NameVal,
      'ContactUs[email]': email,
      'ContactUs[message]': MessageVal,
    };
    try {
      const res = await getApiData(endPoint, 'POST', params);

      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('🚀 ~ file: index.js:97 ~ ContactData ~ error:', error);
    }
  };

  useEffect(() => {
    return () => {
      null;
    };
  }, []);
  return (
    <View style={style.container}>
      <HeaderBar HeaderText={translate('contactdottieScreen')} />
      <ScrollView
        contentContainerStyle={style.ScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.flexCon}>
          <LabeledInput
            Label={translate('Email')}
            placeholder={translate('Email')}
            isRequired
            value={email}
            onChangeText={value => {
              setEmail(value);
              setErrObj(old => {
                return {
                  ...old,
                  emailErr: false,
                  emailMsg: '',
                };
              });
            }}
            showError={ErrObj.emailErr}
            errorText={ErrObj.emailMsg}
          />
          <LabeledInput
            Label={translate('name')}
            placeholder={translate('name')}
            isRequired
            LabledInputStyle={style.flexItem}
            showError={ErrObj.NameErr}
            errorText={ErrObj.NameErrMsg}
            onChangeText={val => {
              setNameVal(val);
              setErrObj(old => {
                return {
                  ...old,
                  NameErr: false,
                  NameErrMsg: '',
                };
              });
            }}
          />
        </View>

        <LabeledInput
          Label={translate('message')}
          placeholder={translate('message')}
          isRequired
          textArea
          showError={ErrObj.MessageErr}
          errorText={ErrObj.MessageErrMsg}
          onChangeText={val => {
            setMessageVal(val);
            setErrObj(old => {
              return {
                ...old,
                MessageErr: false,
                MessageErrMsg: '',
              };
            });
          }}
        />
        <Button
          title={translate('contactdottieScreen')}
          style={{ marginTop: 30 }}
          onPress={() => {
            checkValidation();
          }}
          loading={BtnLoader}
        />
      </ScrollView>
    </View>
  );
};

export default ContactDottie;
