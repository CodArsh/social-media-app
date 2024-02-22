/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderBar from '@components/HeaderBar';
import RenderHtml from 'react-native-render-html';
import Loader from '@components/Loader/Loader';
import InfoCard from '@components/InfoCard';
import translate from '../../lang/lang/Translate';
import { getApiData } from '@utils/apiHelper';
import { isEmpty } from 'lodash';
import SChip from '@components/SChip';
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useWindowDimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
const EventDetails = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;
  const [PageLoader, setPageLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [EventData, setEventData] = useState({});
  const [data, setData] = useState('');
  const { width } = useWindowDimensions();
  const source = {
    html: data,
  };

  const EventDetailsAPI = async () => {
    setPageLoader(true);

    try {
      const res = await getApiData(`event/detail?event_id=${eventId}`, 'GET');
      if (res?.status) {
        setData(res?.data?.description);
        setEventData(res?.data);
      } else {
        setEventData([]);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.log(
        '📌 ⏩ file: index.js:16 ⏩ EventDetailsAPI ⏩ error:',
        error,
      );
    }
  };

  useEffect(() => {
    if (eventId) {
      EventDetailsAPI();
    }

    return () => {
      null;
    };
  }, []);

  const JoinEvent = async () => {
    setBtnLoader(true);
    try {
      const res = await getApiData(`event/join?event_id=${eventId}`, 'GET');
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:82 ⏩ JoinEvent ⏩ error:', error);
    }
  };

  const LeaveEvent = async () => {
    setBtnLoader(true);
    try {
      const res = await getApiData(`event/left?event_id=${eventId}`, 'GET');
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:82 ⏩ JoinEvent ⏩ error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('Events')} userProfile />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown}>
            <InfoCard
              title={EventData?.name}
              location={EventData?.location + `, ${EventData?.country}`}
              date={`${EventData?.start_date} To ${EventData?.end_date}`}
              Img={EventData?.photos}
              joinBtn
              btnType={EventData?.is_joined ? 'outlined' : 'primary'}
              btnText={
                EventData?.is_joined
                  ? translate('LeaveEvent')
                  : translate('JoinEvent')
              }
              onButtonPress={() =>
                EventData?.is_joined ? LeaveEvent() : JoinEvent()
              }
              BtnLoading={BtnLoader}
              titleStyle={{ fontSize: 15 }}
            />
          </Animated.View>
          <Animated.View entering={FadeInUp}>
            <Text style={styles.titles}>{translate('SponsoredBy')}</Text>
            <Text style={styles.descText}>{EventData?.sponsored_by}</Text>

            <Text style={styles.titles}>{translate('description')}</Text>

            {data && <RenderHtml contentWidth={width} source={source} />}
          </Animated.View>

          <View style={styles.EventSeeAllCon}>
            <Text style={styles.titles}>
              {!isEmpty(EventData?.user_data)
                ? translate('Joinedinevent')
                : EventData?.is_joined
                ? translate('joinedthisEvent')
                : translate('firstjoinevent')}
            </Text>
            {!isEmpty(EventData?.user_data) && (
              <SChip
                type="text"
                text={translate('seeAll')}
                chipStyle={styles.chip}
                onPress={() =>
                  navigation.navigate('EventJoinedUser', { eventId: eventId })
                }
              />
            )}
          </View>
          {!isEmpty(EventData?.user_data) && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item?.user_id}
              data={EventData?.user_data}
              renderItem={({ item, index }) => {
                return (
                  <InfoCard
                    style={[styles.InfoCard, index !== 0 && { marginLeft: 10 }]}
                    imgConStyle={[styles.InfoImg]}
                    Img={item?.profile_photo}
                    title={item?.name}
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
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default EventDetails;
