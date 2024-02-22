/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import styles from './style';
import InfoCard from '@components/InfoCard';
import NoDataFound from '@components/NoData';
import BaseSetting from '@config/setting';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import { getApiData } from '@utils/apiHelper';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import Loader from '@components/Loader/Loader';
import { useSelector } from 'react-redux';
import { BaseColors, FontFamily } from '@config/theme';
import { useDispatch } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import CModal from '@components/CModal';
import Button from '@components/Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Matches({ navigation, route }) {
  const { isSubscribed } = useSelector(state => {
    return state.auth;
  });

  useEffect(() => {
    getMatches(false);
  }, []);

  const dispatch = useDispatch();
  const { setMatch } = Authentication;
  const [visible, setVisible] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [PageLoader, setPageLoader] = useState(true);
  const [moreLoad, setMoreLoad] = useState(false);
  const [matchList, setMatchList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const [userId, setUserId] = useState();
  const [loadAccept, setLoadAccept] = useState(false);
  const [loadDecline, setLoadDecline] = useState(false);
  const modalChildren = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}> {translate('AreYouSure')} </Text>

        <Text style={styles.desc}>{translate('wantUnmatch')} ?</Text>
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
              onPress={() => unmatchUser(userId)}
              loading={btnLoader}
              title={translate('Yes')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const modalCancel = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}> {translate('AreYouSure')} </Text>

        <Text style={styles.desc}>{translate('cancelMsg')} ?</Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() => setVisibleCancel(false)}
              type="outlined"
              title={translate('No')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress={() => cancelUserRequest(userId)}
              loading={btnLoader}
              title={translate('sure')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // matches area
  const getMatches = async bool => {

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
      const res = await getApiData(
        `${BaseSetting.endpoints.userMatches}?page=${page_no}`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(matchList);
        const NewList = res?.data || [];
        if (data) {
          setMatchList(flattenDeep([...data, NewList]));
        } else {
          setMatchList(NewList);
        }
        dispatch(setMatch(false));
        setPagination(res?.pagination);
      } else {
        setMatchList([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
    } catch (error) {
      setMoreLoad(false);
      setPageLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // User remove from match list
  const handleUnmatch = id => {
    return setVisible(true), setUserId(id);
  };
  const unmatchUser = async uId => {
    setBtnLoader(true);
    const endpoint = `${BaseSetting.endpoints.removeMatch}?user_id=${uId}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setVisible(false);
        getMatches(true);
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log(
        '📌 ⏩ file: index.js:106 ⏩ VisitorListAPI ⏩ error:',
        error,
      );
    }
  };

  // User cancel request from match list
  const handleCancel = id => {
    return setVisibleCancel(true), setUserId(id);
  };
  const cancelUserRequest = async uId => {
    setBtnLoader(true);
    const endpoint = `${BaseSetting.endpoints.cancelRequest}?user_id=${uId}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setVisibleCancel(false);
        getMatches(true);
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log(
        '📌 ⏩ file: index.js:106 ⏩ VisitorListAPI ⏩ error:',
        error,
      );
    }
  };

  // accept request
  const acceptRequest = async (uId, nId) => {
    setLoadAccept(uId);
    const endPoint = `${BaseSetting.endpoints.userAccept}?user_id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        getMatches(true);
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
  const rejectRequest = async (uId, nId) => {
    const endPoint = `${BaseSetting.endpoints.userReject}?user_id=${uId}&notify_id=${nId}`;
    setLoadDecline(uId);
    try {
      const res = await getApiData(endPoint, 'GET');

      if (res?.status) {
        getMatches(true);
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
  useEffect(() => {
    getMatches(false);

    return () => {
      null;
    };
  }, []);

  useEffect(() => {
    getMatches(false);

    return () => {
      null;
    };
  }, []);

  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      getMatches(false);
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

  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('myMatches')} />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.page}>
          <View style={{ flex: 1, marginTop: 20 }}>
            {isEmpty(matchList) ? (
              <View style={{ height: '100%', justifyContent: 'center' }}>
                <NoDataFound />
              </View>
            ) : (
              <FlatList
                data={matchList}
                keyExtractor={item => item?.user_id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.FlatList}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                      }}
                    >
                      <InfoCard
                        unMatch
                        style={[styles.InfoCard]}
                        title={item?.name}
                        location={item?.location}
                        date={item?.date}
                        age={item?.age.toString()}
                        Img={item?.profile_photo}
                        chipStyle={styles.chipStyle}
                        chipTextStyle={styles.chipText}
                        chipType="outlined"
                        onPress={() =>
                          navigation.navigate('Profile', {
                            from: 'user',
                            id: item?.user_id,
                          })
                        }
                      />
                      {item?.action === 'unmatch' && (
                        <TouchableOpacity
                          onPress={() => handleUnmatch(item?.user_id)}
                          style={styles.unMatchBox}
                        >
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}
                          >
                            <Text
                              style={{
                                color: BaseColors.white,
                                fontSize: 14,
                                fontFamily: FontFamily.semiBold,
                                paddingVertical: 8,
                              }}
                            >
                              {translate('unmatch')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      {item?.action === 'accept' && (
                        <View style={styles.accept}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}
                          >
                            <TouchableOpacity style={styles.acceptBox}>
                              <Button
                                title={translate('Accept')}
                                loading={
                                  loadAccept === item?.user_id ? true : false
                                }
                                TextStyle={{
                                  color: BaseColors.white,
                                  fontSize: 14,
                                  fontFamily: FontFamily.semiBold,
                                }}
                                style={{
                                  marginHorizontal: 10,
                                  paddingVertical: 5,
                                }}
                                onPress={() =>
                                  isSubscribed
                                    ? acceptRequest(item?.user_id, item?.id)
                                    : navigation.navigate('PaymentMethod', {
                                        from: 'Matches',
                                      })
                                }
                              />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.rejectBox}>
                              <Button
                                type="outlined"
                                newOutline
                                title={translate('Decline')}
                                loading={
                                  loadDecline === item?.user_id ? true : false
                                }
                                TextStyle={{
                                  color: BaseColors.primary,
                                  fontSize: 14,
                                  fontFamily: FontFamily.semiBold,
                                }}
                                style={{
                                  color: BaseColors.primary,
                                  backgroundColor: BaseColors.white,

                                  marginHorizontal: 10,
                                  borderBottomRightRadius: 10,
                                  width: '100%',
                                }}
                                onPress={() =>
                                  rejectRequest(item?.user_id, item?.id)
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}

                      {item?.action === 'cancel' && (
                        <TouchableOpacity
                          onPress={() => handleCancel(item?.user_id)}
                          style={styles.unMatchBox}
                        >
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}
                          >
                            <Text
                              style={{
                                color: BaseColors.white,
                                fontSize: 14,
                                fontFamily: FontFamily.semiBold,
                                paddingVertical: 8,
                              }}
                            >
                              {translate('cancelReq')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
                refreshControl={
                  <RefreshControl
                    colors={[BaseColors.primary]}
                    tintColor={BaseColors.primary}
                    onRefresh={() => {
                      setPageLoader(true);
                      getMatches(true);
                    }}
                  />
                }
                ListFooterComponent={renderFooterComponent}
                onEndReached={getMoreData}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        </View>
      )}
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
        onRequestClose={() => {
          setVisibleCancel(false);
        }}
        visible={visibleCancel}
        onPressOverlay={() => {
          setVisibleCancel(false);
        }}
        modalType="bottom"
        modalStyle={styles.modalStyle}
        children={modalCancel(null)}
      />
    </View>
  );
}
