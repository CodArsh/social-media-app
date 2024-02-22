/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import CModal from '@components/CModal';
import Button from '@components/Button';
import { logout } from '@utils/CommonFunction';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CustomIcon } from '@config/LoadIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import LangSelect from '@components/LangSelect';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
const SettingsScreen = ({ navigation }) => {
  const { fcmToken } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const { setUserData } = Authentication;
  const dispatch = useDispatch();
  const [BtnLoader, setBtnLoader] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    content: '',
  });
  const iconSize = 30;
  const rightIcon = (
    <Icon1 name="chevron-right" size={iconSize} color={BaseColors.black90} />
  );

  const SettingItem = [
    {
      id: 'EditProfile',
      leftIcon: 'Icon-feather-edit',
      rightIcon,
      title: translate('editProfile'),
      navTo: 'EditProfile',
    },
    {
      id: 'Characteristics',
      leftIcon: 'user',
      rightIcon,
      title: translate('Characteristic'),
      navTo: 'Characteristic',
    },
    {
      id: 'Interest',
      leftIcon: 'interest',
      rightIcon,
      title: translate('Interest'),
      navTo: 'Interest',
    },
    {
      id: 'Preferences',
      leftIcon: 'Icon-feather-sliders',
      rightIcon,
      title: translate('pref'),
      navTo: 'Preferences',
    },
    {
      id: 'ChangePassword',
      leftIcon: 'user-lock',
      rightIcon,
      title: translate('changePassword'),
      navTo: 'ChangePassword',
    },
    {
      id: 'ContactDottie',
      leftIcon: 'phone',
      rightIcon,
      title: translate('contactDottie'),
      navTo: 'ContactDottie',
    },
    {
      id: 'AboutDottie',
      leftIcon: 'exclamationcircleo',
      rightIcon,
      title: translate('aboutDottie'),
      navTo: '',
    },
    {
      id: 'Matches',
      leftIcon: 'tick',
      rightIcon,
      title: translate('myMatches'),
      navTo: 'Matches',
    },
    {
      id: 'Favorites',
      leftIcon: 'Love_Icon',
      rightIcon,
      title: translate('myFavorite'),
      navTo: 'Favourite',
    },
    {
      id: 'Visitors',
      leftIcon: 'couple',
      rightIcon,
      title: translate('myVisitors'),
    },
    {
      id: 'Winks',
      leftIcon: 'emojione-monotone_winking-face',
      rightIcon,
      title: translate('Winks'),
    },
    {
      id: 'Subscription',
      leftIcon: 'Subscribe',
      rightIcon,
      title: translate('mySubscription'),
      navTo: 'PaymentMethod',
    },
    {
      id: 'Block',
      leftIcon: 'block',
      rightIcon,
      title: translate('blockedProfiles'),
      navTo: 'BlockedProfile',
    },
    {
      id: 'LogOut',
      leftIcon: 'logout',
      rightIcon,
      title: translate('Logout'),
    },
  ];

  const AboutDottiItem = [
    {
      id: 'faq',
      leftIcon: Images.faqImage,
      rightIcon,
      title: translate('faq'),
      navTo: 'Faqs',
    },
    {
      id: 'faqVideos',
      leftIcon: Images.playIcon,
      rightIcon,
      title: translate('faqVideos'),
      navTo: 'FaqVideos',
    },
    {
      id: 'Terms&Condition',
      leftIcon: Images.termsImage,
      rightIcon,
      title: translate('terms&Conditions'),
      navTo: 'TermsAgreement',
    },
    {
      id: 'PrivacyPolicy',
      leftIcon: Images.privacyImage,
      rightIcon,
      title: translate('privacyPolicy'),
      navTo: 'PrivacyPolicy',
    },
  ];

  /* =============================== HANDEL PRESS ============================== */
  const HandelPress = item => {
    switch (item?.id) {
      case 'Visitors':
        navigation.navigate('VisitorWink', { from: 'visitor' });
        break;

      case 'Winks':
        navigation.navigate('VisitorWink', { from: 'winks' });
        break;

      case 'Subscription':
        navigation.navigate('PaymentMethod', { from: 'Settings' });
        break;

      case 'faq':
        setModal({
          open: false,
          content: '',
        });
        navigation.navigate(item?.navTo);
        break;

      case 'faqVideos':
        setModal({
          open: false,
          content: '',
        });
        navigation.navigate(item?.navTo);
        break;

      case 'Terms&Condition':
        setModal({
          open: false,
          content: '',
        });
        navigation.navigate(item?.navTo);
        break;

      case 'PrivacyPolicy':
        navigation.navigate(item?.navTo);
        setModal({
          open: false,
          content: '',
        });
        break;

      case 'AboutDottie':
        setModal({
          open: true,
          content: 'About',
        });
        break;

      case 'LogOut':
        setModal({
          open: true,
          content: 'LogOut',
        });
        break;

      default:
        navigation.navigate(item?.navTo);
        break;
    }
  };

  const OnlineStatus = async (val = '0') => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.onlineStatus}?status=${val}`,
      );
    } catch (error) {
      console.log('📌 ⏩ file: index.js:73 ⏩ OnlineStatus ⏩ error:', error);
    }
  };

  /* ============================== HANDEL DELETE ============================== */
  const HandelLogOut = async () => {
    setBtnLoader(true);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.logOut}?uuid=${fcmToken}`,
        'GET',
      );
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        dispatch(setUserData({}));
        setModal({ open: false, content: '' });
        OnlineStatus('0');
        logout();
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:220 ⏩ HandelLogOut ⏩ error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        HeaderText={translate('Settings')}
        rightComponent={
          <TouchableOpacity
            activeOpacity={BaseSetting.buttonOpacity}
            onPress={() =>
              setModal({
                open: true,
                content: 'lang',
              })
            }
            style={{
              borderWidth: 1,
              height: 35,
              width: 45,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 3,
              borderColor: BaseColors.secondary,
            }}
          >
            <Image
              source={
                languageData === 'en-US'
                  ? Images.US
                  : languageData === 'de-DE'
                  ? Images.GR
                  : languageData === 'fr-FR'
                  ? Images.FR
                  : languageData === 'nl-NL'
                  ? Images.DU
                  : null
              }
              style={{ height: 25, width: 35, borderRadius: 2 }}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView persistentScrollbar>
        <View style={styles.settigCon}>
          {SettingItem?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.id}
                activeOpacity={BaseSetting.buttonOpacity}
                style={[
                  styles.settingItem,
                  index === 0 ? null : { borderTopWidth: 1 },
                ]}
                onPress={() => HandelPress(item)}
              >
                <View
                  style={{
                    width: 35,
                    alignItems: 'center',
                  }}
                >
                  {item?.id === 'AboutDottie' ? (
                    <Icon3
                      name="exclamationcircleo"
                      size={20}
                      color={BaseColors.black90}
                    />
                  ) : item?.id === 'Characteristics' ? (
                    <Icon name="user" size={20} color={BaseColors.black90} />
                  ) : item?.id === 'ChangePassword' ? (
                    <Icon2 name="unlock" size={20} color={BaseColors.black90} />
                  ) : (
                    <CustomIcon
                      name={item.leftIcon}
                      size={item.leftIcon === 'tick' ? 15 : 20}
                      color={BaseColors.black90}
                    />
                  )}
                </View>
                <Text style={styles.settingItemText}>{item.title}</Text>
                {item.rightIcon}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {modal.open && (
        <CModal
          modalType="bottom"
          visible={modal.open}
          onPressOverlay={() => setModal({ open: false, content: '' })}
          onRequestClose={() => setModal({ open: false, content: '' })}
        >
          {modal.content === 'LogOut' ? (
            <View style={styles.modalCon}>
              <Text style={styles.modalText}>{translate('accountLogOut')}</Text>
              <View style={styles.btnCon}>
                <Button
                  title={translate('cancel')}
                  type="outlined"
                  style={styles.btnStyle}
                  onPress={() => setModal({ open: false, content: '' })}
                />
                <Button
                  loading={BtnLoader}
                  title={translate('logOut')}
                  style={styles.btnStyle}
                  onPress={() => HandelLogOut()}
                />
              </View>
            </View>
          ) : modal.content === 'lang' ? (
            <LangSelect />
          ) : (
            AboutDottiItem?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={[
                    styles.settingItem,
                    index !== 0 && { borderTopWidth: 1 },
                  ]}
                  onPress={() => HandelPress(item)}
                >
                  <Image
                    resizeMode="cover"
                    source={item.leftIcon}
                    style={styles.leftImagem}
                  />
                  <Text style={styles.settingItemText}>{item.title}</Text>
                  {item.rightIcon}
                </TouchableOpacity>
              );
            })
          )}
          {modal.content === 'About' && (
            <Text style={styles.version}>
              {Platform.OS === 'ios' ? 'v1.7' : 'v2.1'}
            </Text>
          )}
        </CModal>
      )}
    </View>
  );
};
export default SettingsScreen;
