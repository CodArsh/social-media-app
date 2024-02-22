import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '@config';
import { enableAnimateInEaseOut } from '@utils/CommonFunction';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import Lottie from 'lottie-react-native';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import Authentication from '@redux/reducers/auth/actions';

const SplashScreen = ({ navigation }) => {
  const { userData, accessToken } = useSelector(state => state.auth);
  const { reloadBool, languageData } = useSelector(state => state.language);
  const {
    setUserData,
    setIsSubscribe,
    setSubscriptionDetails,
    setEmptyProfile,
  } = Authentication;
  const dispatch = useDispatch();
  const animation = useSharedValue(500);
  const animation1 = useSharedValue(500);
  const USER_AVAILABLE = 'available';

  const SetCallStatus = async (userId, uStatus = '') => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.setCallStatus}?user_id=${userId}&status=${uStatus}`,
      );
    } catch (erorr) {
      console.log(
        '📌 ⏩ file: index.js:1087 ⏩ SetCallStatus ⏩ erorr:',
        erorr,
      );
    }
  };

  useEffect(() => {
    if (accessToken) {
      SetCallStatus(userData?.id, USER_AVAILABLE);
    }
    animation.value = 1000;
    animation1.value = 1000;
    setTimeout(() => {
      if (accessToken) {
        DefaultData();
        navigation.reset({
          routes: [{ name: 'Dashboard' }],
        });
      } else if (!accessToken && reloadBool) {
        navigation.reset({
          routes: [{ name: 'MainScreen' }],
        });
      } else {
        navigation.reset({
          routes: [{ name: 'LanguageSelect' }],
        });
      }
    }, 3000);
  }, []);
  enableAnimateInEaseOut();

  //default data setup
  const [user, setUser] = useState(userData);
  const DefaultData = async () => {
    const endPoint = `${BaseSetting.endpoints.splashData}?language_id=${languageData}`;
    try {
      const resp = await getApiData(endPoint, 'GET');
      if (resp?.status) {
        setUser(preVal => {
          return {
            ...preVal,
            name: resp?.data?.name,
            nick_name: resp?.data?.nick_name,
            profile_photo: resp?.data?.profile_photo,
          };
        });
        dispatch(setIsSubscribe(resp?.data?.is_subscribed));
        dispatch(setSubscriptionDetails(resp?.data?.subscription_detail));

        dispatch(
          setEmptyProfile({
            profile: resp?.data?.profile_empty,
            character: resp?.data?.character_empty,
            interest: resp?.data?.interest_empty,
            preference: resp?.data?.preference_empty,
          }),
        );
      } else {
        console.log('response error');
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:75 ⏩ DefaultData ⏩ error:', error);
    }
  };
  useEffect(() => {
    dispatch(setUserData(user));
  }, [user]);

  return (
    <>
      <StatusBar
        backgroundColor={'#0000'}
        translucent
        barStyle="light-content"
      />
      <View style={styles.centerCon}>
        <Animatable.Image
          duration={3000}
          animation={'fadeIn'}
          style={styles.logoImg}
          source={Images.logo}
          resizeMode="contain"
        />
        <Lottie
          speed={1}
          autoPlay
          source={require('../../assets/lottieFiles/hearts.json')}
        />
      </View>
    </>
  );
};

export default SplashScreen;
