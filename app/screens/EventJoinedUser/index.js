import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderBar from '@components/HeaderBar';
import styles from './styles';
import Loader from '@components/Loader/Loader';
import InfoCard from '@components/InfoCard';
import NoDataFound from '@components/NoData';
import { getApiData } from '@utils/apiHelper';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import { BaseColors } from '@config/theme';

const EventJoinedUser = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [JoinedUsers, setJoinedUsers] = useState([]);
  const [pagination, setPagination] = useState({});

  const JoinedUserListAPI = async bool => {
    if (bool) {
      setPageLoader(true);
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
      const res = await getApiData(
        `${BaseSetting.endpoints.userJoined}?event_id=${eventId}&page=${page_no}`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(JoinedUsers);
        const NewList = res?.data || [];
        if (data) {
          setJoinedUsers(flattenDeep([...data, NewList]));
        } else {
          setJoinedUsers(NewList);
        }
        setPagination(res?.pagination);
      } else {
        setJoinedUsers([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
    } catch (error) {
      setMoreLoad(false);
      setPageLoader(false);
      console.log(
        '📌 ⏩ file: EventJoindUser:74 ⏩ JoinedUserListAPI ⏩ error:',
        error,
      );
    }
  };

  useEffect(() => {
    if (eventId) {
      JoinedUserListAPI(true);
    }

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
      JoinedUserListAPI(false);
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
      <HeaderBar HeaderText={translate('Joinedusers')} />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <>
          {isEmpty(JoinedUsers) ? (
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <NoDataFound />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={JoinedUsers}
              keyExtractor={item => item?.user_id}
              numColumns={2}
              contentContainerStyle={styles.FlatList}
              renderItem={({ item, index }) => {
                return (
                  <InfoCard
                    style={[styles.InfoCard]}
                    title={item?.name}
                    Img={item?.profile_photo}
                    age={item?.age?.toString()}
                    onPress={() =>
                      navigation.navigate('Profile', {
                        from: 'user',
                        id: item?.user_id,
                      })
                    }
                  />
                );
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColors.primary]}
                  tintColor={BaseColors.primary}
                  onRefresh={() => {
                    setPageLoader(true);
                    JoinedUserListAPI(true);
                  }}
                />
              }
              ListFooterComponent={renderFooterComponent}
              onEndReached={getMoreData}
              onEndReachedThreshold={0.5}
            />
          )}
        </>
      )}
    </View>
  );
};

export default EventJoinedUser;
