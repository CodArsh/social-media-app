import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import TabSwitch from '@components/TabSwitch';
import MessageCard from '@components/Messagecard';
import HeaderBar from '@components/HeaderBar';
import Loader from '@components/Loader/Loader';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import NoDataFound from '@components/NoData';
import translate from '../../lang/lang/Translate';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import { BaseColors } from '@config/theme';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const VisitorWink = ({ navigation, route }) => {
  const from = route?.params?.from;
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [visitorList, setVisitorList] = useState([]);
  const [winkList, setWinkList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [BtnLoader, setBtnLoader] = useState(false);
  const switchOptions = [
    { id: 'visitors', name: translate('VISITORS') },
    { id: 'winks', name: translate('WINKS') },
  ];
  const [activeTab, setActiveTab] = useState(
    switchOptions[from === 'visitor' ? 0 : 1],
  );

  const getVisitor = async bool => {
    setPageLoader(bool);

    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;

    let page_no = 0;
    if (bool === true) {
      page_no = 1;
    } else {
      page_no = cPage + 1;
    }
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.visitorList}?page=${page_no}`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(visitorList);
        const NewList = res?.data || [];
        if (data) {
          setVisitorList(flattenDeep([...data, NewList]));
        } else {
          setVisitorList(NewList);
        }
        setPagination(res?.pagination);
      } else {
        setVisitorList([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
    } catch (error) {
      setPageLoader(false);
      setMoreLoad(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  const getWink = async bool => {
    setPageLoader(bool);

    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;

    let page_no = 0;
    if (bool === true) {
      page_no = 1;
    } else {
      page_no = cPage + 1;
    }
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.winkList}?page=${page_no}`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(winkList);
        const NewList = res?.data || [];
        if (data) {
          setWinkList(flattenDeep([...data, NewList]));
        } else {
          setWinkList(NewList);
        }
        setPagination(res?.pagination);
      } else {
        setWinkList([]);
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
  //delete wink
  const winkDelete = async uId => {
    setPageLoader(true);
    setBtnLoader(true);
    const endPoint = `${BaseSetting.endpoints.deleteWink}?id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        getWink(true);
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
      getWink(true);
      setBtnLoader(false);
      setPageLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  //delete visit
  const visitDelete = async uId => {
    setPageLoader(true);
    setBtnLoader(true);
    const endPoint = `${BaseSetting.endpoints.deleteVist}?id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        getVisitor(true);
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
      getVisitor(true);
      setPageLoader(false);
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };
  useEffect(() => {
    if (activeTab.id === 'visitors') {
      getVisitor(true);
    } else if (activeTab.id === 'winks') {
      getWink(true);
    }
    return () => {
      null;
    };
  }, [activeTab]);

  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      if (activeTab?.id === 'visitors') {
        getVisitor(false);
      } else if (activeTab?.id === 'winks') {
        getWink(false);
      }
    }
  };
  const renderHiddenItem = ({ item, index }, n) => {
    const commonSize = 25;
    return (
      <View style={[styles.hiddenView, index !== 0 && { borderTopWidth: 1 }]}>
        <TouchableOpacity
          activeOpacity={BaseSetting.buttonOpacity}
          style={styles.hiddenBtn}
          onPress={() =>
            activeTab.id === 'visitors'
              ? visitDelete(item?.id)
              : winkDelete(item?.id)
          }
        >
          {BtnLoader ? (
            <Loader style={{ height: commonSize, width: commonSize }} />
          ) : (
            <Icon name="delete" size={commonSize} color={BaseColors.red} />
          )}
        </TouchableOpacity>
      </View>
    );
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
    <View style={styles.main}>
      <HeaderBar HeaderText={activeTab?.name} />
      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={Current => {
          setActiveTab(Current);
        }}
      />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.flatContainer}>
          {activeTab.id === 'visitors' && isEmpty(visitorList) && (
            <View style={styles.blankData}>
              <NoDataFound />
            </View>
          )}
          {activeTab.id === 'winks' && isEmpty(winkList) && (
            <View style={styles.blankData}>
              <NoDataFound />
            </View>
          )}

          <SwipeListView
            data={activeTab.id === 'visitors' ? visitorList : winkList}
            keyExtractor={item => item?.user_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <MessageCard
                  title={item?.name}
                  image={item?.profile_photo}
                  age={item?.age.toString()}
                  timeDateText={item?.created_at}
                  onPress={() =>
                    navigation.navigate('Profile', {
                      from: 'user',
                      id: item?.user_id,
                    })
                  }
                  onlineDot={item?.is_online}
                />
              );
            }}
            renderHiddenItem={renderHiddenItem}
            ListFooterComponent={renderFooterComponent}
            onEndReached={getMoreData}
            onEndReachedThreshold={0.5}
            rightOpenValue={-75}
            disableRightSwipe
          />
        </View>
      )}
    </View>
  );
};

export default VisitorWink;
