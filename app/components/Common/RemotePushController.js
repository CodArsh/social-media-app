import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
// import { showNotification } from '../services/NotificationHelper';
// import PushNotification from 'react-native-push-notification';
// import { store } from '@redux/store/configureStore';
// import NotificationAction from '@redux/reducers/notification/actions';
// import { navigationRef } from 'app/navigation/NavigationService';
// import { logout, getNotificationCount } from '@utils/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { flattenDeep, isNull } from 'lodash';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

/**
 *firebase notification
 * @function  RemotePushController
 */

const RemotePushController = () => {
  NotificationServices();

  const { setFcmToken } = Authentication;
  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(uToken => {
          dispatch(setFcmToken(uToken));
        });
    }
  }, []);
  const dispatch = useDispatch();
  // cloud messaging request
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const { fcmToken } = useSelector(state => {
    return state.auth;
  });
  // console.log('NEW FCM: ', fcmToken);
};

const NotificationServices = navigation => {
  const dispatch = useDispatch();
  const { setBadge, setNotification } = Authentication;

  useEffect(() => {
    const onNotificationOpenedApp = remoteMessage => {
      dispatch(setBadge(true));
      console.log('Background:', remoteMessage.notification);
    };

    const onMessage = async remoteMessage => {
      // await getNotification(true);
      dispatch(setNotification(remoteMessage));
      dispatch(setBadge(true));
      console.log('Foreground:', JSON.stringify(remoteMessage));
    };

    const getInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    };

    messaging().onNotificationOpenedApp(onNotificationOpenedApp);
    messaging().onMessage(onMessage);
    getInitialNotification();

    return () => {
      messaging()
        .onNotificationOpenedApp()
        .unsubscribe(onNotificationOpenedApp);
      messaging().onMessage().unsubscribe(onMessage);
    };
  }, [dispatch]);
};

export { RemotePushController, NotificationServices };
