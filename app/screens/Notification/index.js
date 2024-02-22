import {
  FlatList,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import MessageCard from '@components/Messagecard';
import HeaderBar from '@components/HeaderBar';
import Authentication from '@redux/reducers/auth/actions';
import Button from '@components/Button';
import NoDataFound from '@components/NoData';
import CModal from '@components/CModal';
import translate from '../../lang/lang/Translate';
import Loader from '@components/Loader/Loader';
import { BaseColors } from '@config/theme';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const Notification = ({ navigation }) => {
  useEffect(() => {
    Platform.OS === 'ios' &&
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);
  const dispatch = useDispatch();
  const { badge, isSubscribed, newlist } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  useEffect(() => {
    getNotification(true);
  }, [newlist === 'NotificationStackNavigator']);
  const { setBadge, setNewlist } = Authentication;
  const [pageLoader, setPageLoader] = useState(true);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [loadAccept, setLoadAccept] = useState(false);
  const [loadDecline, setLoadDecline] = useState(false);
  const [list, setList] = useState([]);
  const [moreLoad, setMoreLoad] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    loadMore: true,
  });
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [profileData, setProfileData] = useState();
  const iconSize = 22;
  const iconColor = BaseColors.secondary;

  const getProfile = item => {
    return dispatch(setBadge(false)), setProfileData(item), setModal(true);
  };
  const modalChildren = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}>{translate('AreYouSure')}</Text>
        <Text style={styles.desc}>{translate('deleteallnotifications')}</Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() => setVisible(false)}
              type="outlined"
              title={translate('cancel')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress={() => deleteAllNotification()}
              loading={BtnLoader}
              title={translate('DeleteAll')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getNotification(false);
  }, []);

  // this function for get notification list
  async function getNotification(bool = false) {
    setPageLoader(bool);
    setRefreshLoader(true);
    dispatch(setBadge(false));
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;

    let page_no = 0;
    if (bool) {
      page_no = 1;
    } else {
      page_no = cPage + 1;
    }
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.notificationList}?page=${page_no}&language_id=${languageData}`,
        'GET',
      );
      if (response?.status) {
        const data = !bool && cloneDeep(list);
        const NewList = response?.data;
        if (data) {
          setList(flattenDeep([...data, NewList]));
        } else {
          setList(NewList);
        }
        setPagination(response?.pagination);
      } else {
        setList([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
      setRefreshLoader(false);
    } catch (error) {
      setPageLoader(false);
      setMoreLoad(false);
      console.log('error ===>>>', error);
    }
  }
  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;

    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      getNotification(false);
    }
  };
  const renderFooterComponent = () => {
    if (moreLoad) {
      return (
        <View style={styles.loaderFooterView}>
          <Loader small />
        </View>
      );
    } else {
      return <View style={styles.footer} />;
    }
  };
  // accept request
  const acceptRequest = async uId => {
    setLoadAccept(uId);
    const endPoint = `${BaseSetting.endpoints.userAccept}?user_id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        getNotification(true);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.navigate('MatchScreen', { from: uId });
      }
      setLoadAccept(false);
    } catch (error) {
      setLoadAccept(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // reject request
  const rejectRequest = async uId => {
    const endPoint = `${BaseSetting.endpoints.userReject}?user_id=${uId}`;
    setLoadDecline(uId);
    try {
      const res = await getApiData(endPoint, 'GET');

      if (res?.status) {
        getNotification(true);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      }
      setLoadDecline(false);
    } catch (error) {
      setLoadDecline(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // delete single notification
  const deleteOneNotification = async uId => {
    setPageLoader(true);
    const endPoint = `${BaseSetting.endpoints.singleNotification}?id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');

      if (res?.status) {
        getNotification(true);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      getNotification(true);
      setPageLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // delete all notification
  const deleteAllNotification = async () => {
    setBtnLoader(true);
    setPageLoader(true);
    const endPoint = `${BaseSetting.endpoints.allNotifications}`;
    try {
      const res = await getApiData(endPoint, 'GET');

      if (res?.status) {
        getNotification(false);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      getNotification(false);
      setVisible(false);
      setBtnLoader(false);
      setPageLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        rightComponent={
          !isEmpty(list) && (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              activeOpacity={BaseSetting.buttonOpacity}
            >
              <Text style={styles.clearall}>{translate('Clearall')}</Text>
            </TouchableOpacity>
          )
        }
        HeaderText={translate('Notification')}
      />
      {pageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.main}>
          {isEmpty(list) && (
            <View style={styles.blankData}>
              <NoDataFound />
            </View>
          )}
          <View style={styles.container}>
            <FlatList
              data={list}
              keyExtractor={item => item?.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return item?.type === 'request_sent' ? (
                  <View>
                    <MessageCard
                      onPress={() => getProfile(item)}
                      containerStyle={styles.MessageCard}
                      title={item?.title}
                      message={item?.message}
                      image={item?.data?.profile_photo}
                    />
                    <View style={styles.twoBtns}>
                      <Button
                        title={translate('Accept')}
                        loading={
                          loadAccept === item?.from_user_id ? true : false
                        }
                        style={styles.setWidth}
                        onPress={() =>
                          isSubscribed
                            ? acceptRequest(item?.from_user_id)
                            : navigation.navigate('PaymentMethod', {
                                from: 'Notification',
                              })
                        }
                      />
                      <Button
                        type="outlined"
                        loading={
                          loadDecline === item?.from_user_id ? true : false
                        }
                        title={translate('Decline')}
                        style={styles.setWidth}
                        onPress={() => rejectRequest(item?.from_user_id)}
                      />
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      borderBottomColor: BaseColors.black20,
                      borderBottomWidth: 1,
                    }}
                  >
                    <MessageCard
                      title={item?.data?.name}
                      message={item?.message}
                      image={item?.data?.profile_photo}
                      onPress={() => getProfile(item)}
                      timeDateText={item?.format_time}
                    />
                  </TouchableOpacity>
                );
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColors.primary]}
                  tintColor={BaseColors.primary}
                  onRefresh={() => {
                    setPageLoader(true);
                    getNotification(true);
                  }}
                />
              }
              ListFooterComponent={renderFooterComponent}
              onEndReached={getMoreData}
              onEndReachedThreshold={0.5}
              rightOpenValue={-75}
              disableRightSwipe
            />
          </View>
          <CModal
            onRequestClose={() => {
              setVisible(false);
            }}
            visible={visible}
            onPressOverlay={() => {
              setVisible(false);
            }}
            modalType="bottom"
            modalStyle={styles.modalStyle}
            children={modalChildren(null)}
          />
          <CModal
            visible={modal}
            modalType="bottom"
            modalStyle={styles.modal}
            onRequestClose={() => setModal(!modal)}
            onPressOverlay={() => setModal(!modal)}
          >
            <View style={styles.headLine} />
            <Text style={styles.modalTitle}>{translate('Notification')}</Text>
            <TouchableOpacity
              style={[styles.uploadSelect, { borderBottomWidth: 1 }]}
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={() => (
                setModal(false),
                navigation.navigate('Profile', {
                  from: 'user',
                  id: profileData?.from_user_id,
                })
              )}
            >
              <Icon1 name="user" size={iconSize} color={iconColor} />
              <Text style={styles.SelectText}>{translate('VisitProfile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadSelect}
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={() => (
                setModal(false), deleteOneNotification(profileData?.id)
              )}
            >
              <Icon1 name="trash" size={iconSize} color={iconColor} />
              <Text style={styles.SelectText}>
                {translate('DeleteNotification')}
              </Text>
            </TouchableOpacity>
          </CModal>
          {badge && (
            <View style={styles.load}>
              <TouchableOpacity
                style={styles.reloadText}
                onPress={() => {
                  setRefreshLoader(true);
                  setPageLoader(true);
                  getNotification(true);
                }}
              >
                <Text style={{ color: BaseColors.white, fontSize: 15 }}>
                  {translate('Reloadnow')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Notification;
