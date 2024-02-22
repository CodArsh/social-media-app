import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import BaseSetting from '@config/setting';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import Button from '@components/Button';
import { getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { isNull } from 'lodash';
import { BaseColors } from '@config/theme';

const ReportUser = ({ navigation, route }) => {
  const userId = route?.params?.id;
  const reportData = [
    {
      id: 1,
      why: translate('fake'),
    },
    {
      id: 2,
      why: translate('adult'),
    },
    {
      id: 3,
      why: translate('nude'),
    },
  ];
  const [reason, setReason] = useState(null);
  const [otherReason, setOtherReason] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [finalReason, setFinalReason] = useState();
  const [empty, setEmpty] = useState(null);
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    setFinalReason(reason);
  }, [reason]);

  useEffect(() => {
    setFinalReason(otherReason);
  }, [otherReason]);

  const userReport = async () => {
    setBtnLoader(true);
    const endPoint = BaseSetting.endpoints.reportUser;
    const params = {
      'Report[user_id]': userId.toString(),
      'Report[reason]': finalReason,
    };
    try {
      const resp = await getApiDataProgress(endPoint, 'POST', params);
      if (resp?.status) {
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
        text1: error,
        type: 'error',
      });
      setBtnLoader(false);
    }
  };

  const validation = () => {
    return showOtherInput && isNull(empty) ? setShowErr(true) : userReport();
  };
  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('reportUser')} />
      <View style={{ paddingHorizontal: 20 }}>
        {reportData?.map(item => {
          return (
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => {
                setReason(item?.why);
                setShowOtherInput(false);
                setShowErr(false);
                setEmpty(null);
              }}
            >
              {reason === item?.why && <View style={styles.radioSelected} />}
              {reason !== item?.why && <View style={styles.radioUnselected} />}
              <Text style={styles.radioButtonText}>{item?.why}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => {
            setReason('Other');
            setShowOtherInput(true);
          }}
        >
          {reason === 'Other' && <View style={styles.radioSelected} />}
          {reason !== 'Other' && <View style={styles.radioUnselected} />}
          <Text style={styles.radioButtonText}>{translate('other')}</Text>
        </TouchableOpacity>
        {showOtherInput && (
          <View>
            <TextInput
              style={styles.otherInput}
              placeholder={translate('otherReason')}
              onChangeText={value => (
                setOtherReason(value), setEmpty(value), setShowErr(false)
              )}
              placeholderTextColor={BaseColors.black50}
            />
            {showErr && (
              <Text style={{ color: BaseColors.primary }}>
                {translate('requiredfield')}
              </Text>
            )}
          </View>
        )}

        <View style={{ width: '100%', marginTop: 25 }}>
          <TouchableOpacity>
            <Button
              onPress={() => validation()}
              loading={BtnLoader}
              title={translate('reportNow')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReportUser;
