/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Appearance,
  Animated,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// import {getStatusBarHeight, isIPhoneX} from 'react-native-status-bar-height';
import { BaseColors, BaseStyles, FontFamily } from '@config/theme';
import { useTheme } from '@react-navigation/native';
import translate from '../lang/lang/Translate';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { SvgXml } from 'react-native-svg';
import { CustomIcon } from '@config/LoadIcons';

const renderSvg = () => {};
export default function BottomTabBar({ state, descriptors, navigation }) {
  const colorScheme = Appearance.getColorScheme();
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(tabWidth * 2 - 7));
  const homeAnimRef = useRef();
  const eventAnimRef = useRef();
  const msgAnimRef = useRef();
  const notifyAnimRef = useRef();
  const settingAnimRef = useRef();
  /* All events in bottombar are hendle here it means when user change screen it will be store in redux */
  const dispatch = useDispatch();
  const { badge, screen } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const { setScreen } = Authentication;

  const isDark = false; // colorScheme === 'dark';
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const xml = `<svg width="428" height="104" viewBox="0 0 428 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_10_5655)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M165.432 45C172.569 45 178.308 39.422 181.478 33.0282C187.363 21.1592 199.604 13 213.75 13C227.896 13 240.137 21.1592 246.022 33.0282C249.192 39.422 254.931 45 262.068 45H413.75C421.482 45 427.75 51.268 427.75 59V106C427.75 113.732 421.482 120 413.75 120H13.75C6.018 120 -0.25 113.732 -0.25 106V59C-0.25 51.268 6.01801 45 13.75 45H165.432Z" fill=${
    isDark ? 'black' : 'white'
  }/>
</g>
<defs>
<filter id="filter0_d_10_5655" x="-9.25" y="0" width="454" height="133" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4"/>
<feGaussianBlur stdDeviation="6.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_5655"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_5655" result="shape"/>
</filter>
</defs>
</svg>`;

  const getIcons = (label, isFocused, index) => {
    const tabIconColor = isFocused ? BaseColors.primary : BaseColors.secondary;

    switch (label) {
      case 'HomeStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={homeAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            >
              <AIcon size={26} color={tabIconColor} name="home" />
            </Text>
          </Animatable.View>
        );
      case 'EventsStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={eventAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            >
              <AIcon size={26} color={tabIconColor} name="calendar" />
            </Text>
          </Animatable.View>
        );

      case 'MessageStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={msgAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            >
              <MCIcon
                size={26}
                color={tabIconColor}
                name="message-processing-outline"
              />
            </Text>
          </Animatable.View>
        );

      case 'NotificationStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={notifyAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            >
              <View>
                {badge && (
                  <View
                    style={{
                      backgroundColor: BaseColors.primary,
                      height: 8,
                      width: 8,
                      borderRadius: 50,
                      marginLeft: 15,
                      position: 'absolute',
                      zIndex: 1,
                    }}
                  />
                )}
                <IIcon
                  size={26}
                  color={tabIconColor}
                  name="notifications-outline"
                />
              </View>
            </Text>
          </Animatable.View>
        );

      case 'SettingsStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={settingAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.medium,
              }}
            >
              <IIcon size={26} color={tabIconColor} name="settings-outline" />
            </Text>
          </Animatable.View>
        );
    }
  };

  const getIconsName = (label, isFocused) => {
    switch (label) {
      case 'HomeStackNavigator':
        return translate('Home');

      case 'EventsStackNavigator':
        return translate('Event');
      case 'MessageStackNavigator':
        return translate('message');
      case 'NotificationStackNavigator':
        return translate('Notification');
      case 'SettingsStackNavigator':
        return translate('Settings');
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [
              {
                translateX: translateValue,
              },
            ],
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <View style={styles.roundViewStyle} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          if (index === 0) {
            homeAnimRef.current.swing(1000);
          }
          if (index === 1) {
            eventAnimRef.current.swing(1000);
          }
          if (index === 2) {
            msgAnimRef.current.swing(1000);
          }
          if (index === 3) {
            notifyAnimRef.current.swing(1000);
          }
          if (index === 4) {
            settingAnimRef.current.swing(1000);
          }
          if (true) {
            navigation.navigate(route.name);
            dispatch(setScreen(route.name));
          }
          // const event = navigation.emit({
          //   type: 'tabPress',
          //   target: route.key,
          //   canPreventDefault: true,
          // });
          // if (!isFocused) {
          //   setTimeout(() => {
          //     // FavRef.current.tada(3500);
          //     navigation.navigate(route.name);
          //   }, 200);
          // }
          // if (!isFocused && !event.defaultPrevented) {
          //   navigation.navigate(route.name);
          // }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              paddingBottom: 10,
              FontFamily: FontFamily.bold,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: BaseColors.white,
              zIndex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: BaseColors.white,
              }}
            >
              {route?.name === 'MessageStackNavigator' ? (
                <Animatable.View
                  useNativeDriver
                  ref={msgAnimRef}
                  style={{
                    padding: 12,
                    borderRadius: 50,
                    backgroundColor: BaseColors.primary,
                    position: 'absolute',
                    bottom: 9,
                    elevation: 10,
                    shadowColor: BaseColors.primary,
                  }}
                >
                  <Text
                    style={{
                      color: isFocused ? BaseColors.primary : '#585858',
                      fontSize: 12,
                      fontFamily: FontFamily.medium,
                    }}
                  >
                    <MCIcon
                      size={26}
                      color={BaseColors.white}
                      name="message-processing-outline"
                    />
                  </Text>
                </Animatable.View>
              ) : (
                getIcons(label, isFocused, index)
              )}
            </View>
            {isFocused ? (
              <Text
                style={{
                  color: BaseColors.primary,
                  fontFamily: FontFamily.semiBold,
                  fontSize:
                    languageData === 'nl-NL' || languageData === 'de-DE'
                      ? 10
                      : 11,
                  marginVertical: 3,
                }}
              >
                {getIconsName(label, isFocused)}
              </Text>
            ) : (
              <View
                style={
                  route?.name !== 'MessageStackNavigator' && { marginTop: -10 }
                }
              >
                <Text
                  style={{
                    color: BaseColors.primary,
                    fontFamily: FontFamily.bold,
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
      <View
        style={{
          zIndex: 0,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <SvgXml xml={xml} width={Dimensions.get('screen').width} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    backgroundColor: BaseColors.whiteSmoke,
    textAlign: 'center',
    ...BaseStyles.shadow,
  },
  iconContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
    height: 60,
    // paddingBottom: isIPhoneX ? 15 : 10,
    // height: isIPhoneX ? 70 : 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabName: {
    color: BaseColors.backRed,
    fontSize: 15,
  },
});
