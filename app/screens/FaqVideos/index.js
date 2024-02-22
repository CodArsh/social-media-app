import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation-locker'; // Updated import
import HeaderBar from '@components/HeaderBar';
import Loader from '@components/Loader/Loader';
import NoDataFound from '@components/NoData';
import InfoCard from '@components/InfoCard';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import translate from '../../lang/lang/Translate';
import { cloneDeep, flattenDeep, toNumber } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import CModal from '@components/CModal';
import { BaseColors } from '@config/theme';

const FaqVideos = ({ navigation }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [matchList, setMatchList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [videoData, setVideoData] = useState();
  const [VideoLoader, setVideoLoader] = useState(false);
  const { languageData } = useSelector(state => state.language);

  const handleEnterFullscreen = () => {
    setIsFullscreen(true);
    Orientation.lockToLandscape(); // Updated method
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    Orientation.lockToPortrait(); // Updated method
  };
  useEffect(() => {
    if (!isFullscreen) {
      Orientation.lockToPortrait();
    }
  }, [isFullscreen]);

  useEffect(() => {
    getVideos(false);
    Orientation.lockToPortrait();
    const unsubscribe = navigation.addListener('blur', () => {
      Orientation.unlockAllOrientations();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isFullscreen) {
      setVisible(false);
    }
  }, [isFullscreen]);

  const getVideos = async bool => {
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
      const res = await getApiData(
        `${BaseSetting.endpoints.faqVideos}?language_id=${languageData}`,
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

  const modalChildren = () => {
    return (
      <View>
        {VideoLoader && <Loader small style={styles.VideoLoader} />}
        <VideoPlayer
          video={{
            uri: videoData?.link,
          }}
          pauseOnPress
          disableFullscreen
          maxBitRate={2000000} // 2 megabits
          rate={1}
          showDuration
          autoplay
          onLoadStart={() => setVideoLoader(true)}
          onLoad={() => setVideoLoader(false)}
          style={isFullscreen ? styles.fullscreenVideo : styles.normalVideo}
          onEnterFullscreen={handleEnterFullscreen}
          onExitFullscreen={handleExitFullscreen}
        />
        {!isFullscreen && (
          <TouchableOpacity
            onPress={handleEnterFullscreen}
            style={styles.fullScr}
          >
            <Icon
              name={'fit-screen'}
              size={30}
              style={{ color: BaseColors.black }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const getPopup = data => {
    setVisible(true);
    setVideoData(data);
  };

  return (
    <View style={styles.container}>
      {isFullscreen && <StatusBar hidden />}
      {!isFullscreen && <HeaderBar HeaderText={translate('faqVideos')} />}
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.page}>
          <View style={{ flex: 1, marginTop: 20 }}>
            {matchList.length === 0 ? (
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
                    <View style={styles.infoCardTop}>
                      <InfoCard
                        unMatch
                        style={[styles.InfoCard]}
                        title={item?.title}
                        location={item?.location}
                        date={item?.date}
                        age={item?.age?.toString()}
                        Img={item?.thumbnail}
                        chipStyle={styles.chipStyle}
                        chipTextStyle={styles.chipText}
                        chipType="outlined"
                      />
                      <TouchableOpacity
                        onPress={() => getPopup(item)}
                        style={styles.unMatchBox}
                      >
                        <View style={styles.dataLayer}>
                          <Text style={styles.cardBtn}>
                            {translate('playNow')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        </View>
      )}
      {isFullscreen && (
        <View
          style={{
            marginTop: isFullscreen ? 0 : Dimensions.get('window').width / 2,
            height: '100%',
            width: '100%',
            backgroundColor: BaseColors.black,
          }}
        >

          {VideoLoader && <Loader small style={styles.VideoLoaderFC} />}
          <VideoPlayer
            video={{
              uri: videoData?.link,
            }}
            pauseOnPress
            disableFullscreen
            maxBitRate={2000000} // 2 megabits
            rate={1}
            showDuration
            autoplay
            onLoadStart={() => setVideoLoader(true)}
            onLoad={() => setVideoLoader(false)}
            style={[
              isFullscreen ? styles.fullscreenVideo : styles.normalVideo,
              {
                height: isFullscreen
                  ? '100%'
                  : Dimensions.get('window').width / 1.7,
                width: '100%',
              },
            ]}
            onEnterFullscreen={handleEnterFullscreen}
            onExitFullscreen={handleExitFullscreen}
          />
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
        modalStyle={styles.modalStyle}
        children={modalChildren(null)}
      />
    </View>
  );
};

export default FaqVideos;
