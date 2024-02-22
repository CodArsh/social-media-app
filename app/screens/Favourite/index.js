import { View, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import MessageCard from '@components/Messagecard';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import Loader from '@components/Loader/Loader';
import NoDataFound from '@components/NoData';
import { cloneDeep, flattenDeep, isEmpty, toNumber } from 'lodash';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BaseColors } from '@config/theme';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Favourite = ({ navigation, route }) => {
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [FavoriteList, setFavoriteList] = useState([]);
  const [pagination, setPagination] = useState({});

  async function getData(bool) {
    setPageLoader(bool);
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
        `${BaseSetting.endpoints.favouriteList}?page=${page_no}`,
        'GET',
      );
      if (response?.status) {
        const data = !bool && cloneDeep(FavoriteList);
        const NewList = response?.data;
        if (data) {
          setFavoriteList(flattenDeep([...data, NewList]));
        } else {
          setFavoriteList(NewList);
        }
        setPagination(response?.pagination);
      } else {
        setFavoriteList([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:57 ⏩ getData ⏩ error:', error);
      setPageLoader(false);
      setMoreLoad(false);
    }
  }

  useEffect(() => {
    getData(true);
  }, []);

  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      getData(false);
    }
  };

  const renderFooterComponent = () => {
    if (moreLoad) {
      return (
        <View style={style.loaderFooterView}>
          <Loader small />
        </View>
      );
    }
  };

  const RemoveFavourite = async Uid => {
    setBtnLoader(true);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.favouriteUser}?fav_user_id=${Uid}`,
        'GET',
      );
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        getData(true);
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log(
        '📌 ⏩ file: index.js:89 ⏩ RemoveFavourite ⏩ error:',
        error,
      );
    }
  };
  const renderHiddenItem = ({ item, index }, n) => {
    const commonSize = 25;
    return (
      <View style={[style.hiddenView, index !== 0 && { borderTopWidth: 1 }]}>
        <TouchableOpacity
          activeOpacity={BaseSetting.buttonOpacity}
          style={style.hiddenBtn}
          onPress={() => RemoveFavourite(item?.user_id)}
        >
          {BtnLoader ? (
            <Loader style={{ height: commonSize, width: commonSize }} />
          ) : (
            <Icon
              name="heart-minus-outline"
              size={commonSize}
              color={BaseColors.red}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <HeaderBar HeaderText={translate('myFavorite')} />
      {PageLoader ? (
        <View style={style.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={style.flatContainer}>
          {isEmpty(FavoriteList) ? (
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <NoDataFound />
            </View>
          ) : (
            <SwipeListView
              data={FavoriteList}
              keyExtractor={item => item?.user_id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MessageCard
                    containerStyle={[
                      index !== 0 && { borderTopWidth: 1 },
                      style.MessageCard,
                    ]}
                    title={item?.name}
                    image={item?.profile_photo}
                    age={item?.age.toString()}
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
              refreshControl={
                <RefreshControl
                  colors={[BaseColors.primary]}
                  tintColor={BaseColors.primary}
                  onRefresh={() => {
                    setPageLoader(true);
                    getData(true);
                  }}
                />
              }
              renderHiddenItem={renderHiddenItem}
              ListFooterComponent={renderFooterComponent}
              onEndReached={getMoreData}
              onEndReachedThreshold={0.5}
              rightOpenValue={-75}
              disableRightSwipe
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Favourite;
