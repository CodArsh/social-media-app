/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useReducer, useEffect, useRef } from 'react';
import { AppState, Linking, Platform, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from '@screens/SplashScreen';
import { NotificationContext, NoInternet } from '@components';
import { RemotePushController } from '@components/Common/RemotePushController';
import notificationReducer from '@redux/reducers/notificationReducer';
import { store } from '@redux/store/configureStore';
import AuthAction from '@redux/reducers/auth/actions';
import { BaseColors, DarkBaseColor } from '@config/theme';
import { navigationRef } from './NavigationService';
import MainScreen from '@screens/MainScreen';
import SettingsScreen from '@screens/SettingsScreen';
import SigninScreen from '@screens/SigninScreen';
import BottomTabBar from './BottomTabBar';
import Home from '@screens/Home';
import Events from '@screens/Events';
import Notification from '@screens/Notification';
import Message from '@screens/Message';
import Profile from '@screens/Profile';
import ForgotPassword from '@screens/ForgotPassword';
import MatchScreen from '@screens/MatchScreen';
import SignUp from '@screens/SignUp';
import LanguageSelect from '@screens/LanguageSelect';
import EditProfile from '@screens/EditProfile';
import VisitorWink from '@screens/Visitor&Wink';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View } from 'react-native-animatable';
import Preferences from '@screens/Preferences';
import ChangePassword from '@screens/ChangePassword';
import ChatScreen from '@screens/ChatSCreen';
import ContactDottie from '@screens/ContactDottie';
import TermsAgreement from '@screens/Terms&Agreement';
import Faqs from '@screens/Faqs';
import Characteristic from '@screens/Characteristic';
import ResetPassword from '@screens/ResetPassword';
import Interest from '@screens/Interest';
import _, { isEmpty } from 'lodash';
import Favourite from '@screens/Favourite';
import BlockedProfile from '@screens/BlockedProfile';
import EventDetails from '@screens/EventDetails/index.js';
import EventJoinedUser from '@screens/EventJoinedUser';
import Gallery from '@screens/Gallery/Gallery';
import ReportUser from '@screens/ReportUser';
import PaymentMethod from '@screens/Payment';
import IncomingCall from '@screens/IncomingCall';
import Authentication from '@redux/reducers/auth/actions';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import Checkout from '@screens/Checkout';
import Matches from '@screens/MyMatches';
import FaqVideos from '@screens/FaqVideos';
import Orientation from 'react-native-orientation-locker';
import socket from '@utils/socket';
import AudioSetup from '@screens/AudioSetup';

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === 'ios';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );

    // Connect the socket when the component mounts
    if (userData && !_.isEmpty(userData)) {
      socket.connect();
      userConnect();
      console.log('connect');
    }

    return () => subscription.remove();
  }, []);

  const _handleAppStateChange = nextAppState => {
    appState.current = nextAppState;
    if (nextAppState === 'background') {
      if (userData && !_.isEmpty(userData)) {
        socket.disconnect();
        console.log('Disconnect');
      }
    } else {
      // You can handle socket connection here if needed
      socket.connect();
      userConnect();
    }
  };
  const userConnect = () => {
    const Data = {
      user_id: userData?.id,
      page: 1,
      search: '',
    };
    try {
      socket.emit('userConnect', Data, callBackData => {});
    } catch (error) {
      console.log('📌 ⏩ file: index.js:97 ⏩ userConnect ⏩ error:', error);
    }
  };
  const { setBaseColor, setDarkmode, setActiveScreen } = AuthAction;

  const [Notifystate, dispatchState] = useReducer(
    notificationReducer,
    intitialNotificationState,
  );
  const notiValue = useMemo(() => {
    return { Notifystate, dispatchState };
  }, [Notifystate, dispatchState]);

  const darkmode = store.getState().auth.darkmode;

  if (darkmode === false) {
    dispatch(setBaseColor(BaseColors));
  } else {
    dispatch(setBaseColor(DarkBaseColor));
  }

  const [darkApp, setdarkApp] = useState(darkmode);

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    const eventListener = EventRegister.addEventListener(
      'changeAppTheme',
      data => {
        setdarkApp(data);
        dispatch(setDarkmode(data));
      },
    );
    return () => {
      // Linking.removeEventListener('url', handleDeepLink);
      // EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const handleDeepLink = ({ url }) => {
    console.log('url====>>>>>', url);
    if (url) {
      let token = url?.split('?token=')[1];
      if (url?.includes('reset-password')) {
        !isEmpty(token) &&
          navigationRef.current.navigate('ResetPassword', {
            token: token,
          });
      } else if (url?.includes('change-password')) {
        !isEmpty(token) &&
          navigationRef.current.navigate('ChangePassword', {
            token: token,
          });
      } else if (url?.includes('verify-email')) {
        !isEmpty(token) &&
          navigationRef.current.navigate('SignUp', {
            token: token,
          });
      }
    }
  };

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...BaseColors,
    },
  };

  const appTheme = lightTheme;

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const EventsStack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const ChatStack = createStackNavigator();
  const SettingStack = createStackNavigator();
  const MessageStack = createStackNavigator();

  const toastConfig = {
    /*
        Overwrite 'success' type,
        by modifying the existing `BaseToast` component
      */
    success: props => (
      <BaseToast
        text1NumberOfLines={3}
        text2NumberOfLines={3}
        {...props}
        style={{ borderLeftColor: BaseColors.limeGreen }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    /*
        Overwrite 'error' type,
        by modifying the existing `ErrorToast` component
      */
    error: props => (
      <ErrorToast
        text1NumberOfLines={3}
        text2NumberOfLines={3}
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
        Or create a completely new type - `tomatoToast`,
        building the layout from scratch.
  
        I can consume any custom `props` I want.
        They will be passed when calling the `show` method (see below)
      */
    tomatoToast:
      props =>
      ({ text1, props }) =>
        (
          <View style={{ height: 60, width: '100%', backgroundColor: 'red' }}>
            <Text>{text1}</Text>
          </View>
        ),
  };

  const EventsStackNavigator = () => {
    return (
      <EventsStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <EventsStack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
      </EventsStack.Navigator>
    );
  };
  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  };
  const MessageStackNavigator = () => {
    return (
      <SettingStack.Navigator
        // detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <SettingStack.Screen
          name="Message"
          component={Message}
          options={{ headerShown: false }}
        />
      </SettingStack.Navigator>
    );
  };

  const NotificationStackNavigator = () => {
    return (
      <ChatStack.Navigator
        // detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <ChatStack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      </ChatStack.Navigator>
    );
  };

  const SettingsStackNavigator = () => {
    return (
      <SettingStack.Navigator
        // detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <SettingStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </SettingStack.Navigator>
    );
  };

  const BottomTabsNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={'HomeStackNavigator'}
        tabBar={props => <BottomTabBar {...props} />}
      >
        <Tab.Screen
          name="HomeStackNavigator"
          component={HomeStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="EventsStackNavigator"
          component={EventsStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="MessageStackNavigator"
          component={MessageStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="NotificationStackNavigator"
          component={NotificationStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="SettingsStackNavigator"
          component={SettingsStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Tab.Navigator>
    );
  };
  const { setNewlist } = Authentication;
  function getActiveRouteName(state) {
    const route = state.routes[state.index];
    Orientation.lockToPortrait();
    if (route.state && route.state.index > 0) {
      return getActiveRouteName(route.state);
    }
    dispatch(setNewlist(route.name));
    return route.name;
  }
  return (
    <NotificationContext.Provider value={notiValue}>
      <RemotePushController />
      <NavigationContainer
        ref={navigationRef}
        theme={appTheme}
        onStateChange={state => {
          getActiveRouteName(state);
        }}
      >
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          detachInactiveScreens={IOS ? true : false}
          screenOptions={{
            animationEnabled: true,
            gestureEnabled: IOS ? true : false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Events"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SigninScreen"
            component={SigninScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="LanguageSelect"
            component={LanguageSelect}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MatchScreen"
            component={MatchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VisitorWink"
            component={VisitorWink}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Preferences"
            component={Preferences}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactDottie"
            component={ContactDottie}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Faqs"
            component={Faqs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TermsAgreement"
            component={TermsAgreement}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Characteristic"
            component={Characteristic}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Interest"
            component={Interest}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlockedProfile"
            component={BlockedProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favourite"
            component={Favourite}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventJoinedUser"
            component={EventJoinedUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReportUser"
            component={ReportUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Matches"
            component={Matches}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FaqVideos"
            component={FaqVideos}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AudioSetup"
            component={AudioSetup}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <NoInternet /> */}
      </NavigationContainer>
      <Toast
        type={'success'}
        position={'bottom'}
        bottomOffset={120}
        config={toastConfig}
      />
    </NotificationContext.Provider>
  );
}

export default App;
