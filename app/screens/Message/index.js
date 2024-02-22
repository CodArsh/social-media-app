import { View, FlatList, RefreshControl, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import HeaderBar from '@components/HeaderBar';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import SearchBar from '@components/SearchBar';
import MessageCard from '@components/Messagecard';
import _, { isEmpty, toNumber } from 'lodash';
import { getApiData } from '@utils/apiHelper';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '@components/Loader/Loader';
import translate from '../../lang/lang/Translate';
import { useDebounce } from 'use-debounce';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CModal from '@components/CModal';
import Button from '@components/Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import socket from '@utils/socket';
import moment from 'moment';

import AuthActions from '../../redux/reducers/auth/actions';

const Message = ({ navigation, route }) => {
  const { setActiveProfile } = AuthActions;
  const { userData, activeProfileObj } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [chatUserArr, setChatUserArr] = useState([]);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [visible, setVisible] = useState(false);
  const [msgId, setMsgId] = useState();
  const [debounceValue] = useDebounce(searchVal, 1000);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [user, setUser] = useState();
  const USER_AVAILABLE = 'available';
  const [roomID, setRoomID] = useState();
  useFocusEffect(
    React.useCallback(() => {
      onRefreshChat();
      setSearchVal('');
      getChatList(true);
      SetCallStatus(userData?.id, USER_AVAILABLE);
    }, [navigation]),
  );

  // Message list fixed code
  useEffect(() => {
    setChatLoader(true);
    if (activeProfileObj) {
      setTimeout(() => {
        setChatLoader(false);
        dispatch(setActiveProfile(false));
      }, 1000);
    }
  }, [activeProfileObj]);

  useEffect(() => {
    getChatList(true);

    return () => {
      null;
    };
  }, [debounceValue]);

  useEffect(() => {
    receiveMessage();
  }, []);

  const SetCallStatus = async (userId, uStatus = '') => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.setCallStatus}?user_id=${userId}&status=${uStatus}`,
      );
    } catch (erorr) {
      console.log('📌 ⏩ file: index.js:55 ⏩ SetCallStatus ⏩ erorr:', erorr);
    }
  };

  function onRefreshChat() {
    setRefreshLoader(true);
    // setPendingLoader(true);
    setTimeout(() => {
      getChatList(true);
    }, 1000);
  }

  useEffect(() => {
    receiveMessage();
  }, []);

  const receiveMessage = () => {
    try {
      socket.on('receiveMessage', callBackData => {
        if (callBackData) {
          getChatList(true);
        }
      });
    } catch (error) {
      console.log('📌 ⏩ file: index.js:51 ⏩ receiveMessage ⏩ error:', error);
    }
  };
  const [pagination, setPagination] = useState({});
  const getChatList = async bool => {
    if (bool) {
      setChatLoader(true);
    }
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
      socket.emit(
        'initializeSocket',
        { user_id: userData?.id, search: searchVal?.trim(), page: page_no },
        callBackData => {
          chatStopLoader();
          if (callBackData.status) {
            const res = callBackData?.data?.user_data
              ? callBackData?.data?.user_data
              : callBackData?.data;
            const pages = callBackData?.data?.pagination;
            setChatUserArr(res);
            setPagination(pages);
          } else {
            setChatUserArr([]);
            setPagination({});
          }
          setMoreLoad(false);
        },
      );
    } catch (error) {
      setChatUserArr([]);
      chatStopLoader();
      console.log('📌 ⏩ file: index.js:142 ⏩ getChatList ⏩ error:', error);
    }
    chatStopLoader();
  };
  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      getChatList(false);
    }
  };
  const renderChatListFooterComponent = () => {
    return moreLoad ? <Loader small /> : null;
  };
  function chatStopLoader() {
    setRefreshLoader(false);
    setChatLoader(false);
    setMoreLoad(false);
    setSearchLoad(false);
  }

  const displayAttendingContent = ({ item, index }) => {
    const badgeObj =
      !_.isEmpty(item) &&
      !_.isUndefined(item.badges) &&
      _.isString(item.badges) &&
      !_.isEmpty(item.badges)
        ? JSON.parse(item.badges)
        : {};

    const myBadge = badgeObj[`${userData?.id}`]
      ? badgeObj[`${userData?.id}`]
      : 0;

    return (
      <View style={[styles.chatCards, index !== 0 && { borderTopWidth: 1 }]}>
        {!item?.free_chat && (
          <Icon
            name="lock"
            color={BaseColors.secondary}
            style={styles.lockIcon}
          />
        )}

        <MessageCard
          title={item?.nick_name}
          // image={item?.free_chat && item?.profile_photo}
          image={item?.profile_photo}
          message={item?.text}
          timeDateText={moment.unix(item?.createdAt).format('DD-MM-YYYY')}
          countTxt={myBadge > 0 ? myBadge.toString() : null}
          onLongPress={() => {
            setVisible(true);
            setRoomID(item?.token);
            setMsgId(item?.user_id);
            setUser(item);
          }}
          onPress={() => {
            item?.free_chat
              ? navigation.navigate('ChatScreen', {
                  chatDetails: item,
                })
              : navigation.navigate('PaymentMethod');
          }}
          onlineDot={item?.is_online}
          newTagRight={
            item?.newMsg && (
              <Text
                style={{
                  backgroundColor: BaseColors.limeGreen,
                  color: BaseColors.white,
                  paddingHorizontal: 5,

                  borderRadius: 15,
                }}
              >
                {translate('new')}
              </Text>
            )
          }
        />
      </View>
    );
  };

  // deleteChat
  async function HandelDelete(uId) {
    setBtnLoader(true);

    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.deleteChat}?person_two=${uId}`,
        'GET',
      );
      if (response.status) {
        // deleteChatHistoryCall();
        getChatList(true);
        setVisible(false);
        Toast.show({
          type: 'success',
          text1: response?.message,
        });

        setBtnLoader(false);
      } else {
        setVisible(false);
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong! Please try again',
        });
        setBtnLoader(false);
      }
    } catch (error) {
      setVisible(false);
      console.log('📌 ⏩ file: index.js:287 ⏩ deleteAccount ⏩ error:', error);
      setBtnLoader(false);
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('Inbox')} />

      <View style={styles.main}>
        <SearchBar
          value={searchVal}
          loading={searchLoad}
          onChangeText={val => {
            setSearchLoad(true);
            setSearchVal(val);
          }}
          style={styles.SearchBar}
        />
        {chatLoader ? (
          <View style={styles.LoaderCon}>
            <Loader />
          </View>
        ) : (
          <View style={styles.flatCon}>
            {isEmpty(chatUserArr) ? (
              <View style={{ height: '100%', justifyContent: 'center' }}>
                <Loader />
              </View>
            ) : (
              <FlatList
                contentContainerStyle={styles.flatList}
                keyExtractor={item => item?.conv_id}
                numColumns={1}
                data={chatUserArr}
                onEndReached={getMoreData}
                ListFooterComponent={renderChatListFooterComponent}
                renderItem={displayAttendingContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    colors={[BaseColors.primary]}
                    tintColor={BaseColors.primary}
                    refreshing={refreshLoader}
                    onRefresh={() => {
                      onRefreshChat();
                    }}
                  />
                }
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        )}
      </View>
      <CModal
        modalType="bottom"
        visible={visible}
        onPressOverlay={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalCon}>
          <Text style={styles.modalText}>{translate('AreYouSure')}</Text>
          <Text style={styles.modalText1}>{translate('convMsg')}</Text>
          <View style={styles.btnCon}>
            <Button
              title={translate('cancel')}
              type="outlined"
              style={styles.btnStyleDel}
              onPress={() => setVisible(false)}
            />
            <Button
              loading={BtnLoader}
              title={translate('delete')}
              style={styles.btnStyleDel}
              onPress={() => HandelDelete(msgId)}
            />
          </View>
        </View>
      </CModal>
    </View>
  );
};

export default Message;
