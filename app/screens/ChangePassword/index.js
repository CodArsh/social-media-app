/* eslint-disable react-native/no-inline-styles */
import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import LabeledInput from '@components/LabeledInput';
import Button from '@components/Button';
import { isEmpty } from 'lodash';
import BaseSetting from '@config/setting';
import { getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import translate from '../../lang/lang/Translate';

const ChangePassword = ({ navigation }) => {
  const [BtnLoader, setBtnLoader] = useState(false);
  const [currentPassVal, setCurrentPassVal] = useState('');
  const [currentPassErr, setCurrentPassErr] = useState({
    ErrState: false,
    ErrMsg: '',
  });

  const [newPassVal, setNewPassVal] = useState('');
  const [newPassErr, setNewPassErr] = useState({
    ErrState: false,
    ErrMsg: '',
  });

  const [confirmPassVal, setConfirmPassVal] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState({
    ErrState: false,
    ErrMsg: '',
  });

  const UpdatePasswordAPI = async () => {
    setBtnLoader(true);
    const endPoint = BaseSetting.endpoints.changePassword;
    const params = {
      'ChangePasswordForm[current_password]': currentPassVal,
      'ChangePasswordForm[password]': newPassVal,
      'ChangePasswordForm[confirm_password]': confirmPassVal,
    };
    try {
      const resp = await getApiDataProgress(endPoint, 'POST', params);
      if (resp?.status) {
        clearData();
        Toast.show({
          text1: resp?.message,
          type: 'success',
        });
        navigation.goBack();
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setBtnLoader(false);
    } catch (error) {
      Toast.show({
        text2: error,
        type: 'error',
      });
      setBtnLoader(false);
    }
  };
  const HandleUpdate = () => {
    let Valid = true;
    /* ============================ CURRENT PASSWORD ============================ */
    if (isEmpty(currentPassVal)) {
      Valid = false;
      setCurrentPassErr({
        ErrState: true,
        ErrMsg: translate('currentpassword'),
      });
    } else if (currentPassVal.length < 6 || currentPassVal.length > 15) {
      Valid = false;
      setCurrentPassErr({
        ErrState: true,
        ErrMsg: translate('wrongpassword'),
      });
    } else {
      setCurrentPassErr({
        ErrState: false,
        ErrMsg: '',
      });
    }

    /* ============================== NEW PASSWORD ============================== */
    if (isEmpty(newPassVal)) {
      Valid = false;
      setNewPassErr({
        ErrState: true,
        ErrMsg: translate('enternewpassword'),
      });
    } else if (newPassVal.length < 6 || newPassVal.length > 15) {
      Valid = false;
      setNewPassErr({
        ErrState: true,
        ErrMsg: translate('wrongpassword'),
      });
    } else if (newPassVal === currentPassVal) {
      Valid = false;
      setNewPassErr({
        ErrState: true,
        ErrMsg: translate('checkNewpassword'),
      });
    } else {
      setNewPassErr({
        ErrState: false,
        ErrMsg: '',
      });
    }

    /* ============================ CONFIRM PASSWORD ============================ */
    if (isEmpty(confirmPassVal)) {
      Valid = false;
      setConfirmPassErr({
        ErrState: true,
        ErrMsg: translate('enterconfirmpassword'),
      });
    } else if (confirmPassVal.length < 6 || confirmPassVal.length > 15) {
      Valid = false;
      setConfirmPassErr({
        ErrState: true,
        ErrMsg: translate('wrongpassword'),
      });
    } else if (confirmPassVal !== newPassVal) {
      Valid = false;
      setConfirmPassErr({
        ErrState: true,
        ErrMsg: translate('confirmpassworderr'),
      });
    } else {
      setConfirmPassErr({
        ErrState: false,
        ErrMsg: '',
      });
    }

    if (Valid) {
      UpdatePasswordAPI();
    }
  };

  const clearData = () => {
    setCurrentPassVal('');
    setNewPassVal('');
    setConfirmPassVal('');
  };
  return (
    <ScrollView style={styles.container}>
      <HeaderBar HeaderText={translate('changePassword')} />

      <View style={styles.main}>
        <LabeledInput
          Label={translate('currentPassword')}
          placeholder={translate('currentPassword')}
          LabledInputStyle={styles.input}
          eyePassword
          value={currentPassVal}
          onChangeText={val => setCurrentPassVal(val)}
          showError={currentPassErr.ErrState}
          errorText={currentPassErr.ErrMsg}
          isRequired
        />
        <LabeledInput
          Label={translate('newpassword')}
          placeholder={translate('newpassword')}
          LabledInputStyle={styles.input}
          eyePassword
          value={newPassVal}
          onChangeText={val => setNewPassVal(val)}
          showError={newPassErr.ErrState}
          errorText={newPassErr.ErrMsg}
          isRequired
        />
        <LabeledInput
          Label={translate('cPass')}
          placeholder={translate('cPass')}
          LabledInputStyle={styles.input}
          eyePassword
          value={confirmPassVal}
          onChangeText={val => setConfirmPassVal(val)}
          showError={confirmPassErr.ErrState}
          errorText={confirmPassErr.ErrMsg}
          isRequired
        />

        <Button
          title={translate('updatePassword')}
          style={{ marginTop: 50 }}
          onPress={HandleUpdate}
          loading={BtnLoader}
        />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
