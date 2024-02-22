import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-native-stripe-checkout-webview';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import Authentication from '@redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { BaseColors, FontFamily } from '@config/theme';
import Lottie from 'lottie-react-native';
import Button from '@components/Button';
import { Images } from '@config';
import translate from '../../lang/lang/Translate';
export default function Checkout({ navigation, route }) {
  const IOS = Platform.OS === 'ios';
  const [pay, setPay] = useState(false);
  const { subscriptionDetails } = useSelector(state => {
    return state.auth;
  });
  const { setIsSubscribe, setSubscriptionDetails } = Authentication;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const sessioId = route?.params?.data;
  const updateId = route?.params?.planId;
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('SettingsStackNavigator', { from: 'Payment' });
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setDetails(subscriptionDetails);
  });

  // Update Plans in database
  const getUpdate = async () => {
    setPay(true);
    const endPoint = `${BaseSetting.endpoints.updatePlan}?subscription_id=${updateId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setShow(true);
        dispatch(setIsSubscribe(true));
        dispatch(setSubscriptionDetails(res?.data));
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };
  return pay ? (
    <View style={styles.main}>
      <Lottie
        source={Images.payment}
        style={[
          {
            height: 250,
            width: 250,
            alignSelf: 'center',
          },
        ]}
        autoPlay
        loop
      />
      <Text style={styles.done}>{translate('paymentDone')}</Text>
      <View style={styles.desc}>
        <Text style={styles.txtHead}>{translate('processed')}</Text>
        <Text style={styles.txtHead}>{translate('details')}</Text>
      </View>
      {show && (
        <View style={{ width: '100%', paddingHorizontal: 25 }}>
          <View style={styles.voucher}>
            <Text style={styles.txt1}>{translate('totalAmount')}</Text>
            <Text style={styles.txt2}>€{details?.amount}</Text>
          </View>
          <View style={styles.voucher}>
            <Text style={styles.txt1}>{translate('planName')}</Text>
            <Text style={styles.txt2}>{details?.plan_name}</Text>
          </View>
          <View style={styles.voucher}>
            <Text style={styles.txt1}>{translate('duration')}</Text>
            <Text style={styles.txt2}>{details?.duration}</Text>
          </View>
          <View style={[styles.voucher, { marginBottom: 15 }]}>
            <Text style={styles.txt1}>{translate('expiry')}</Text>
            <Text style={styles.txt2}>{details?.package_expiry}</Text>
          </View>
        </View>
      )}
      <Button
        style={{ paddingHorizontal: 15, marginTop: 20 }}
        title={translate('goBack')}
        onPress={() => navigation.navigate('PaymentMethod')}
      />
    </View>
  ) : (
    <View style={{ flex: 1, marginTop: IOS ? 35 : 5 }}>
      <StripeCheckout
        stripePublicKey={
          'pk_live_51MjhtNIOCXwVIdyZZF32xYZnDlzPNmXEoVpL9nmgr8hhjlklkMTu51hITx6iNIc97oqoglWXFWOMErCkg6AUkOJ700RgJql9gR'
        }
        checkoutSessionInput={{
          sessionId: sessioId,
        }}
        options={{
          htmlContentLoading:
            '<p id="sc-loading" style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;max-width: 100%;">Loading Payment details</p>',
        }}
        onSuccess={({ checkoutSessionId }) => {
          getUpdate();
          console.log(
            `Stripe checkout session succeeded. session id: ${checkoutSessionId}.`,
          );
        }}
        onCancel={() => {
          console.log(`Stripe checkout session cancelled.`);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.white,
  },
  voucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: BaseColors.black30,
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  done: {
    marginBottom: 25,
    color: '#38C172',
    fontFamily: FontFamily.bold,
    fontSize: 22,
  },
  desc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  txt1: {
    color: BaseColors.textColor,
    fontSize: 13,
    fontFamily: FontFamily.semiBold,
  },
  txt2: {
    color: BaseColors.textColor,
    fontSize: 13,
  },
  txtHead: {
    color: BaseColors.black90,
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    marginBottom: 2,
  },
});
