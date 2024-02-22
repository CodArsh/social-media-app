/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  RefreshControl,
  Text,
} from 'react-native';
import styles from './style';
import InfoCard from '@components/InfoCard';
import SearchBar from '@components/SearchBar';
import NoDataFound from '@components/NoData';
import TabSwitch from '@components/TabSwitch';
import BaseSetting from '@config/setting';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import { getApiData } from '@utils/apiHelper';
import { cloneDeep, flattenDeep, isArray, isEmpty, toNumber } from 'lodash';
import Loader from '@components/Loader/Loader';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import PreferenceComponent from '@components/PreferenceComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseColors, FontFamily } from '@config/theme';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import languageActions from '../../redux/reducers/language/actions';
import { useDebounce } from 'use-debounce';
import { CustomIcon } from '@config/LoadIcons';

const Home = ({ navigation, route }) => {
  const { languageData, langBool } = useSelector(state => state.language);
  const { isSubscribed, userData, match, newlist, emptyProfile } = useSelector(
    state => {
      return state.auth;
    },
  );

  // useEffect(() => {
  //   getMatches(false);
  // }, [newlist === 'Home']);

  const dispatch = useDispatch();
  const { setMatch } = Authentication;
  const { setLangBool } = languageActions;

  const switchOptions = [
    { id: 'preferences', name: translate('Preferences') },
    { id: 'matches', name: translate('yourMatches') },
  ];
  const [activeTab, setActiveTab] = useState(
    match ? switchOptions[1] : switchOptions[0],
  );
  const [PageLoader, setPageLoader] = useState(false);
  const [moreLoad, setMoreLoad] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [preferenceList, setPreferenceList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchVal, setSearchVal] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);
  const [debounceValue] = useDebounce(searchVal, 1000);

  const [ageVal, setAgeVal] = useState([16, 99]);
  const [CountryVal, setCountryVal] = useState([]);
  const [CityVal, setCityVal] = useState([]);
  const [ProvinceVal, setProvinceVal] = useState([]);
  const [LimitationVal, setLimitationVal] = useState([]);
  const [HobbiesVal, setHobbiesVal] = useState([]);
  const [LanguageVal, setLanguageVal] = useState([]);
  const [RelVal, setRelVal] = useState([]);
  const [GenderVal, setGenderVal] = useState([]);
  const [orient, setOrient] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [apply, setApply] = useState(false);
  const USER_AVAILABLE = 'available';

  useEffect(() => {
    CheckEmptyProfile();
  }, []);
  useEffect(() => {
    getMatches(true);
    getPreferences(true);
  }, [newlist === 'Dashboard']);
  const CheckEmptyProfile = () => {
    if (emptyProfile?.profile) {
      navigation.replace('EditProfile');
    } else if (emptyProfile?.character) {
      navigation.replace('Characteristic');
    } else if (emptyProfile?.interest) {
      navigation.replace('Interest');
    } else if (emptyProfile?.preference) {
      navigation.replace('Preferences');
    }
  };

  useEffect(() => {
    if (!isFilter) {
      getPreferences(true);
    }
  }, [isFilter]);
  useEffect(() => {
    if (langBool) {
      ChangeLang(languageData);
    }
  }, [langBool]);
  useEffect(() => {
    if (isSubscribed) {
      getMatches(true);
    }
  }, [isSubscribed]);

  const ChangeLang = async (LangId = '') => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.changLang}?lang_id=${LangId}`,
        'GET',
      );
      if (res?.status) {
        dispatch(setLangBool(false));
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:54 ⏩ ChangeLang ⏩ error:', error);
    }
  };
  // preferences area
  const getPreferences = async bool => {
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
    const filter = {
      minAge: ageVal[0]?.toString() || '',
      maxAge: ageVal[1]?.toString() || '',
      city: CityVal[0]?.id?.toString() || '',
      country: CountryVal[0]?.id?.toString() || '',
      language: LanguageVal[0]?.id?.toString() || '',
    };

    let provinceString = '';
    let limitationString = '';
    let orientationString = '';
    let genderString = '';
    let relationString = '';

    if (!isEmpty(GenderVal)) {
      GenderVal?.map((gender, index) => {
        genderString += `gender[${index}]=${gender?.id}&`;
      });
      genderString = genderString.slice(0, -1);
    }
    if (!isEmpty(RelVal)) {
      RelVal?.map((relationship, index) => {
        relationString += `relationship[${index}]=${relationship?.id}&`;
      });
      relationString = relationString.slice(0, -1);
    }

    if (!isEmpty(ProvinceVal)) {
      ProvinceVal?.map((province, index) => {
        provinceString += `province[${index}]=${province?.id}&`;
      });
      provinceString = provinceString.slice(0, -1);
    }

    if (!isEmpty(LimitationVal)) {
      LimitationVal?.map((limit, index) => {
        limitationString += `limitation[${index}]=${limit?.id}&`;
      });
      limitationString = limitationString.slice(0, -1);
    }

    if (!isEmpty(orient)) {
      orient?.map((ori, index) => {
        orientationString += `sexual_orientation[${index}]=${ori?.id}&`;
      });
      orientationString = orientationString.slice(0, -1);
    }

    try {
      const res = await getApiData(
        `${
          BaseSetting.endpoints.preference
        }?page=${page_no}&name=${searchVal}&city=${filter.city}&min_age=${
          filter.minAge
        }&max_age=${filter.maxAge}&${provinceString}&country=${
          filter.country
        }&${
          filter.language
        }&${limitationString}&${genderString}&${orientationString}&${relationString}${
          isFilter && `&filter=${isFilter}`
        }`,
        'GET',
      );
      if (res?.status) {
        const data = !bool && cloneDeep(preferenceList);
        const NewList = res?.data || [];
        if (data) {
          setPreferenceList(flattenDeep([...data, NewList]));
        } else {
          setPreferenceList(NewList);
        }
        setPagination(res?.pagination);
      } else {
        setPreferenceList([]);
        setPagination({});
      }
      setPageLoader(false);
      setMoreLoad(false);
      setSearchLoad(false);
    } catch (error) {
      setPageLoader(false);
      setMoreLoad(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // if nodata found than it will chack once again
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (reload) {
      getMatches(true);
    }
  }, [reload]);

  // matches area
  const getMatches = async bool => {
    setReload(false);
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
        `${BaseSetting.endpoints.matches}?page=${page_no}&name=${searchVal}`,
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
        setReload(true);
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

  const ClearFilter = () => {
    setGenderVal([]);
    setOrient([]);
    setAgeVal([16, 99]);
    setCountryVal([]);
    setCityVal([]);
    setProvinceVal([]);
    setLimitationVal([]);
    setHobbiesVal([]);
    setLanguageVal([]);
    setRelVal([]);
    setVisible(false);
  };

  useEffect(() => {
    ClearFilter();

    if (activeTab?.id === 'preferences') {
      getPreferences(true);
    } else if (activeTab?.id === 'matches') {
      getMatches(true);
    }

    return () => {
      null;
    };
  }, [activeTab]);

  useEffect(() => {
    getPreferences(true);

    return () => {
      null;
    };
  }, [debounceValue]);

  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      if (activeTab?.id === 'preferences') {
        getPreferences(false);
      } else if (activeTab?.id === 'matches') {
        getMatches(false);
      }
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

  useEffect(() => {
    if (isFilter) {
      getPreferences(true);
    }
  }, [apply]);
  const handleAppluFilter = () => {
    setIsFilter(true);
    setVisible(false);
    setApply(!apply);
  };
  return (
    <View style={styles.container}>
      <HeaderBar Greatings userProfile />
      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={Current => {
          setActiveTab(Current);
        }}
      />
      {activeTab?.id === 'preferences' && (
        <View style={styles.searchMenu}>
          <SearchBar
            value={searchVal}
            loading={searchLoad}
            onChangeText={val => {
              setSearchLoad(true);
              setSearchVal(val);
              setIsFilter(val.length > 0 ? true : false);
            }}
            style={styles.SearchBar}
          />
          <TouchableOpacity
            onPress={() => setVisible(true)}
            activeOpacity={BaseSetting.buttonOpacity}
            style={styles.setMenuCon}
          >
            <CustomIcon size={21} name="filter" color={BaseColors.black80} />
          </TouchableOpacity>
        </View>
      )}
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <View style={styles.page}>
          <View style={{ flex: 1, marginTop: 20 }}>
            {activeTab?.id === 'preferences' ? (
              <>
                {isEmpty(preferenceList) && isArray(preferenceList) ? (
                  <View style={{ height: '100%', justifyContent: 'center' }}>
                    <NoDataFound />
                  </View>
                ) : (
                  <FlatList
                    data={preferenceList}
                    keyExtractor={item => item?.user_id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.FlatList}
                    renderItem={({ item, index }) => {
                      return (
                        <InfoCard
                          style={[styles.InfoCard]}
                          title={item?.name}
                          location={item?.location}
                          date={item?.date}
                          is_new={item?.is_new}
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
                          getPreferences(true);
                        }}
                      />
                    }
                    ListFooterComponent={renderFooterComponent}
                    onEndReached={getMoreData}
                    onEndReachedThreshold={0.5}
                  />
                )}
              </>
            ) : (
              <View style={{ position: 'relative' }}>
                {isEmpty(matchList) ? (
                  <View style={{ height: '100%', justifyContent: 'center' }}>
                    <NoDataFound />
                  </View>
                ) : (
                  <FlatList
                    data={matchList}
                    keyExtractor={item => item?.user_id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.FlatList}
                    renderItem={({ item, index }) => {
                      return (
                        <InfoCard
                          style={[styles.InfoCard]}
                          title={item?.name}
                          location={item?.location}
                          date={item?.date}
                          Img={item?.profile_photo}
                          age={item?.age.toString()}
                          chipText={
                            item?.match_percentage &&
                            `${item?.match_percentage.toString()} % ${translate(
                              'matched',
                            )}`
                          }
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
                {!isSubscribed && (
                  <TouchableOpacity
                    style={styles.blur}
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate('PaymentMethod', {
                        from: 'Dashboard',
                      });
                    }}
                  >
                    <BlurView
                      style={styles.blur}
                      overlayColor=""
                      blurType="light"
                      blurAmount={5}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={Visible}
        onRequestClose={() => setVisible(false)}
        style={{ flex: 1 }}
      >
        <View style={styles.modalMainView}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVisible(false)}
            style={{ height: '20%' }}
          />
          <KeyboardAvoidingView
            style={styles.modalView}
            behavior="padding"
            keyboardVerticalOffset={10}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 20 }}>{''}</Text>
              <Text style={{ fontSize: 23, fontFamily: FontFamily.semiBold }}>
                {' '}
                {translate('filter')}
              </Text>
              <TouchableOpacity
                activeOpacity={BaseSetting.buttonOpacity}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  // ClearFilter();
                  setVisible(false);
                }}
              >
                <Icon
                  name="close-circle-outline"
                  size={25}
                  color={BaseColors.primary}
                />
              </TouchableOpacity>
            </View>

            <PreferenceComponent
              ageVal={ageVal}
              setAgeVal={setAgeVal}
              CountryVal={CountryVal}
              setCountryVal={setCountryVal}
              CityVal={CityVal}
              setCityVal={setCityVal}
              ProvinceVal={ProvinceVal}
              setProvinceVal={setProvinceVal}
              LimitationVal={LimitationVal}
              setLimitationVal={setLimitationVal}
              HobbiesVal={HobbiesVal}
              LanguageVal={LanguageVal}
              setHobbiesVal={setHobbiesVal}
              setLanguageVal={setLanguageVal}
              RelVal={RelVal}
              setRelVal={setRelVal}
              GenderVal={GenderVal}
              setGenderVal={setGenderVal}
              orient={orient}
              setOrient={setOrient}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button
                title={translate('ApplyFilter')}
                style={{ marginVertical: 10, width: '48%' }}
                onPress={() => {
                  handleAppluFilter();
                }}
              />
              <Button
                type="outlined"
                title={translate('Clearall')}
                style={{ marginVertical: 10, width: '48%' }}
                onPress={() => {
                  ClearFilter();
                  setIsFilter(false);
                  getPreferences(true);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
