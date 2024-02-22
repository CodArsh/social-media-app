import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import Loader from '@components/Loader/Loader';
import { useSelector } from 'react-redux';
import { cloneDeep, flattenDeep, toNumber } from 'lodash';
import RenderHtml from 'react-native-render-html';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';
const Faqs = ({ navigation }) => {
  const { languageData } = useSelector(state => state.language);
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqList, setFaqList] = useState([]);
  const [PageLoader, setPageLoader] = useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const { width } = useWindowDimensions();
  const source = {
    html: data,
  };
  useEffect(() => {
    FaqListData(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageLoader(true);
      refresher();
      FaqListData(true);
    }, 500);
  }, []);

  const [desc, setDesc] = useState([]);

  // const FaqListData = async () => {
  //   setPageLoader(true);
  //   const endPoint = `${BaseSetting.endpoints.faq}?language_id=${languageData}`;

  //   try {
  //     const res = await getApiData(endPoint, 'GET');
  //     if (res?.status) {
  //       setFaqList(res?.data);
  //     } else {
  //       setFaqList([]);
  //     }
  //     setPageLoader(false);
  //   } catch (error) {
  //     setPageLoader(false);
  //   }
  // };

  const [moreLoad, setMoreLoad] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    loadMore: true,
  });
  const [refreshLoader, setRefreshLoader] = useState(false);

  async function FaqListData(bool = false) {
    setPageLoader(bool);
    setRefreshLoader(true);
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
        `${BaseSetting.endpoints.faq}?language_id=${languageData}&page=${page_no}`,
        'GET',
      );
      if (response?.status) {
        setUpdate(true);
        const data = !bool && cloneDeep(faqList);
        const NewList = response?.data;
        if (data) {
          setFaqList(flattenDeep([...data, NewList]));
          for (let i = 0; i < data?.length; i++) {
            setData([...data[i]?.description]);
            console.log('in');
            desc.push(data[i]?.description);
          }
        } else {
          setFaqList(NewList);
        }
        setPagination(response?.pagination);
      } else {
        setFaqList([]);
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
      FaqListData(false);
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

  const refresher = () => {
    return (
      <RefreshControl
        colors={[BaseColors.primary]}
        tintColor={BaseColors.primary}
        onRefresh={() => {
          setPageLoader(true);
          FaqListData(true);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('faqScreen')} />
      {PageLoader ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Loader />
        </View>
      ) : (
        <FlatList
          data={faqList}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown}>
              <TouchableOpacity
                onPress={() => {
                  if (activeIndex === index) {
                    setActiveIndex(!activeIndex);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                activeOpacity={BaseSetting.buttonOpacity}
                style={[
                  styles.listItem,
                  index === 0 ? null : { borderTopWidth: 1 },
                ]}
              >
                <View style={styles.titleIconCon}>
                  <Text style={styles.ItemText}>{item.title}</Text>
                  <View style={styles.iconbox}>
                    {activeIndex === index ? (
                      <Icon name="up" size={17} color={BaseColors.primary} />
                    ) : (
                      <Icon name="down" size={17} color={BaseColors.primary} />
                    )}
                  </View>
                </View>
                {activeIndex === index && (
                  <Animated.View entering={FadeIn}>
                    {desc?.map((item, index) => {
                      return (
                        <RenderHtml
                          contentWidth={width}
                          source={{
                            html: activeIndex === index ? desc[index] : null,
                          }}
                        />
                      );
                    })}
                  </Animated.View>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}
          keyExtractor={item => item.index}
          onEndReached={getMoreData}
          refreshControl={refresher()}
          ListFooterComponent={renderFooterComponent}
          onEndReachedThreshold={0.5}
          rightOpenValue={-75}
        />
      )}
    </View>
  );
};
export default Faqs;
