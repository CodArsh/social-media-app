import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import styles from './style';
import InfoCard from '@components/InfoCard';
import SearchBar from '@components/SearchBar';
import NoDataFound from '@components/NoData';
import Icon from 'react-native-vector-icons/Entypo';
import { BaseColors } from '@config/theme';
import HeaderBar from '@components/HeaderBar';
import Loader from '@components/Loader/Loader';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import translate from '../../lang/lang/Translate';
import { useFocusEffect } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';

const Events = ({ navigation, route }) => {
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  const [EventList, setEventList] = useState([]);
  const [EventPagination, setEventPagination] = useState({});
  const [searchVal, setSearchVal] = useState('');
  const [debounceValue] = useDebounce(searchVal, 1000);

  useFocusEffect(
    React.useCallback(() => {
      setSearchVal('');
    }, [navigation]),
  );

  const EventListAPI = async bool => {
    if (bool) {
      setPageLoader(true);
    }
    const cPage = EventPagination?.currentPage
      ? toNumber(EventPagination?.currentPage)
      : 0;

    let page_no = 0;

    if (bool === true) {
      page_no = 1;
    } else {
      page_no = cPage + 1;
    }
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.eventList}?page=${page_no}&event_name=${searchVal}`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(EventList);
        const NewList = res?.data || [];
        if (data) {
          setEventList(flattenDeep([...data, NewList]));
        } else {
          setEventList(NewList);
        }
        setEventPagination(res?.pagination);
      } else {
        setEventList([]);
        setEventPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
      setSearchLoad(false);
    } catch (error) {
      setPageLoader(false);
      setMoreLoad(false);
      console.log('📌 ⏩ file: index.js:57 ⏩ EventListAPI ⏩ error:', error);
    }
  };

  useEffect(() => {
    EventListAPI(true);

    return () => {
      null;
    };
  }, [debounceValue]);

  const getMoreData = async () => {
    const cPage = EventPagination?.currentPage
      ? toNumber(EventPagination?.currentPage)
      : 0;

    const tPage = EventPagination?.totalPage
      ? toNumber(EventPagination?.totalPage)
      : 0;
    if (EventPagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      EventListAPI(false);
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
      <HeaderBar HeaderText={translate('Events')} userProfile />
      <SearchBar
        value={searchVal}
        loading={searchLoad}
        onChangeText={val => {
          setSearchLoad(true);
          setSearchVal(val);
        }}
        style={styles.SearchBar}
      />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.main}>
          {isEmpty(EventList) && (
            <View style={styles.blankData}>
              <NoDataFound />
            </View>
          )}
          <FlatList
            data={EventList}
            keyExtractor={item => item?.id}
            style={styles.FlatList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <InfoCard
                  style={[
                    index === 0 ? { marginVertical: 10 } : { marginBottom: 10 },
                  ]}
                  title={item?.name}
                  location={`${item?.location}, ${item?.country}`}
                  date={item?.start_date}
                  Img={item?.photos}
                  avatarData={item?.user_data}
                  userCount={item?.user_count}
                  onPress={() =>
                    navigation.navigate('EventDetails', { eventId: item?.id })
                  }
                  titleStyle={{ fontSize: 15 }}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                colors={[BaseColors.primary]}
                tintColor={BaseColors.primary}
                onRefresh={() => {
                  setPageLoader(true);
                  EventListAPI(true);
                }}
              />
            }
            ListFooterComponent={renderFooterComponent}
            onEndReached={getMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
};

export default Events;
