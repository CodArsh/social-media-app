import { View, Text, ScrollView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import RangeSlider from '@components/RangeSlider';
import DropSelect from '@components/DropSelect';
import Loader from '@components/Loader/Loader';
import BaseSetting from '@config/setting';
import Button from '@components/Button';
import { isEmpty, isNull } from 'lodash';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';

const Preferences = ({ navigation }) => {
  const IOS = Platform.OS === 'ios';
  const dispatch = useDispatch();
  const { setEmptyProfile } = Authentication;
  const scrollViewRef = useRef();
  const errorObj = {
    GenderErr: false,
    GenderErrMsg: '',
    CountryErr: false,
    CountryErrMsg: '',
    ProvinceErr: false,
    ProvinceErrMsg: '',
    RelationErr: false,
    RelationErrMsg: '',
    LimitationErr: false,
    LimitationErrMsg: '',
    orientErr: false,
    orientErrMsg: '',
    languageErr: false,
    languageErrMsg: '',
  };
  const { emptyProfile } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const [ErrObj, setErrObj] = useState(errorObj);
  const [PageLoader, setPageLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [ageVal, setAgeVal] = useState([16, 99]);
  const [CountryVal, setCountryVal] = useState([]);
  const [RelationVal, setRelationVal] = useState([]);
  const [LimitationVal, setLimitationVal] = useState([]);
  const [LangVal, setLangVal] = useState([]);
  const [GenderVal, setGenderVal] = useState([]);
  const [CountryList, setCountryList] = useState([]);
  const [RelationList, setRelationList] = useState([]);
  const [LimitationList, setLimitationList] = useState([]);
  const [LangList, setLangList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [orientionList, setOrientationList] = useState([]);
  const [orient, setOrient] = useState([]);
  const [CityVal, setCityVal] = useState([]);
  const [ProvinceVal, setProvinceVal] = useState([]);
  const [countryId, setCountryId] = useState();
  const [provinceId, setProvinceId] = useState();
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadCity, setLoadCity] = useState(false);

  const ShowLoader = () => {
    return (
      <View style={{ marginTop: 25 }}>
        <Loader small />
      </View>
    );
  };
  const getOriention = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.orientation}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setOrientationList(res?.data);
      } else {
        setOrientationList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  const DefaultData = async () => {
    setPageLoader(true);
    const endPoint = BaseSetting.endpoints.preferenceView;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setGenderVal(res?.data?.prefer_gender || []);
        setAgeVal([res?.data?.min_age || 18, res?.data?.max_age || 30]);
        setCountryVal(
          res?.data?.prefer_country ? [res?.data?.prefer_country] : [],
        );
        setRelationVal(res?.data?.prefer_relationship || []);
        setCityVal(res?.data?.prefer_city ? [res?.data?.prefer_city] : []);
        setProvinceVal(res?.data?.prefer_province || []);
        setLangVal(res?.data?.prefer_language || []);
        setLimitationVal(res?.data?.prefer_limitation || []);
        setOrient(res?.data?.prefer_sexual_orientation || []);
        setCountryId(res?.data?.prefer_country?.id);
        setProvinceId(res?.data?.prefer_province?.id);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  const genderListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.gender}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setGenderList(res?.data);
      } else {
        setGenderList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  const CountryListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.countryList}?language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setCountryList(res?.data);
      } else {
        setCountryList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  const RelationListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.relationShip}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setRelationList(res?.data);
      } else {
        setRelationList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };
  const LimitationListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.limitation}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setLimitationList(res?.data);
      } else {
        setLimitationList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  const LanguageListAPI = async () => {
    const endPoint = BaseSetting.endpoints.LangList;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setLangList(res?.data);
      } else {
        setLangList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:90 ⏩ CountryListAPI ⏩ error:', error);
    }
  };

  useEffect(() => {
    DefaultData();
    CountryListAPI();
    RelationListAPI();
    LimitationListAPI();
    LanguageListAPI();
    genderListAPI();
    getOriention();

    return () => {
      null;
    };
  }, []);

  const HandleUpdateBtn = () => {
    const error = { ...ErrObj };
    let Valid = true;

    /* ================== GENDER ================= */
    if (isEmpty(GenderVal) || isNull(GenderVal)) {
      Valid = false;
      error.GenderErr = true;
      error.GenderErrMsg = translate('SelectGender');
    }

    /* ================== COUNTRY ================= */
    // if (isEmpty(CountryVal) || isNull(CountryVal)) {
    //   Valid = false;
    //   error.CountryErr = true;
    //   error.CountryErrMsg = translate('countryErr');
    // }
    /* ================== PROVINCE ================= */
    // if (isEmpty(ProvinceVal) || isNull(ProvinceVal)) {
    //   Valid = false;
    //   error.ProvinceErr = true;
    //   error.ProvinceErrMsg = translate('provinceErr');
    // }

    /* ================= RELATION ================= */
    // if (isEmpty(RelationVal) || isNull(RelationVal)) {
    //   Valid = false;
    //   error.RelationErr = true;
    //   error.RelationErrMsg = translate('reqRelation');
    // }
    /* ================= LIMITATION ================= */
    // if (isEmpty(LimitationVal) || isNull(LimitationVal)) {
    //   Valid = false;
    //   error.LimitationErr = true;
    //   error.LimitationErrMsg = translate('disabilityPh');
    // }

    // orientation
    if (isEmpty(orient) || isNull(orient)) {
      Valid = false;
      error.orientErr = true;
      error.orientErrMsg = translate('SelectSexualOrientation');
    }

    // Language
    // if (isEmpty(LangVal) || isNull(LangVal)) {
    //   Valid = false;
    //   error.languageErr = true;
    //   error.languageErrMsg = translate('sLanguage');
    // }
    setErrObj(error);

    if (Valid) {
      UpdateAPI();
    } else {
      Toast.show({
        type: 'error',
        text1: translate('fillOutRequired'),
      });
    }
  };

  const UpdateAPI = async () => {
    setBtnLoader(true);
    const NewLang = LangVal?.map(item => item?.id?.toString());
    const NewGen = GenderVal?.map(item => item?.id?.toString());
    const NewRel = RelationVal?.map(item => item?.id?.toString());
    const update_limits = LimitationVal?.map(item => item?.id?.toString());
    const updated_orient = orient?.map(item => item?.id?.toString());
    const ProVal = ProvinceVal?.map(item => item?.id?.toString());
    const endPoint = BaseSetting.endpoints.preferenceUpdate;
    const params = {
      'UserPreference[min_age]': ageVal[0]?.toString(),
      'UserPreference[max_age]': ageVal[1]?.toString(),
      'UserPreference[prefer_country]': CountryVal[0]?.id?.toString(),
      'UserPreference[prefer_city]': CityVal[0]?.id.toString(),
    };

    NewGen?.map((v, i) => {
      return (params[`UserPreference[prefer_gender][${i}]`] = v);
    });

    NewRel?.map((v, i) => {
      return (params[`UserPreference[prefer_relationship][${i}]`] = v);
    });

    ProVal?.map((v, i) => {
      return (params[`UserPreference[prefer_province][${i}]`] = v);
    });

    NewLang.length === 0
      ? (params[`UserPreference[prefer_language]`] = [])
      : NewLang.map((v, i) => {
          return (params[`UserPreference[prefer_language][${i}]`] = v);
        });

    update_limits?.map((item, index) => {
      return (params[`UserPreference[prefer_limitation][${index}]`] = item);
    });

    updated_orient?.map((item, index) => {
      return (params[`UserPreference[prefer_sexual_orientation][${index}]`] =
        item);
    });
    try {
      const res = await getApiDataProgress(endPoint, 'POST', params);
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        if (emptyProfile?.preference) {
          dispatch(
            setEmptyProfile({
              profile: emptyProfile?.profile,
              character: emptyProfile?.character,
              interest: emptyProfile?.interest,
              preference: false,
            }),
          );
          navigation.replace('Home');
        } else {
          navigation.goBack();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      console.log('📌 ⏩ file: index.js:342 ⏩ UpdateApi ⏩ error:', error);
    }
  };
  useEffect(() => {
    ProvinceListData(countryId);
  }, [countryId]);

  const ProvinceListData = async countryID => {
    setCityList([]);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.provinceList}?country_id=${countryID}&language_id=${languageData}`,
        'GET',
      );

      if (res?.status) {
        setLoad(false);
        setProvinceList(res?.data);
      } else {
        setLoad(false);
        setProvinceList([]);
      }
    } catch (error) {
      setLoad(false);
      console.log(
        '📌 ⏩ file: index.js:674 ⏩ ProvinceListData ⏩ error:',
        error,
      );
    }
  };
  useEffect(() => {
    CityListData(provinceId);
  }, [provinceId]);

  const CityListData = async provinceID => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.cityList}?province_id=${provinceID}&language_id=${languageData}`,
        'GET',
      );
      if (res?.status) {
        setLoadCity(false);
        setCityList(res?.data);
      } else {
        setLoadCity(false);
        setCityList([]);
      }
    } catch (error) {
      setLoadCity(false);
      console.log('📌 ⏩ file: index.js:697 ⏩ CityListData ⏩ error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('pref')} />

      <View style={styles.main}>
        {PageLoader ? (
          <View style={styles.LoaderCon}>
            <Loader />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
            >
              {/* =============================== LOOKING FOR ============================== */}
              <DropSelect
                Label={translate('Gender')}
                itemArray={genderList}
                dropStyle={styles.marginVer}
                multiSelect
                isRequired
                placeholder={translate('SelectGender')}
                ErrState={ErrObj.GenderErr}
                ErrMsg={ErrObj.GenderErrMsg}
                value={GenderVal}
                onSelect={val => {
                  setGenderVal(val);
                  setErrObj(old => {
                    return {
                      ...old,
                      GenderErr: false,
                      GenderErrMsg: '',
                    };
                  });
                }}
              />
              {/* orientation */}

              <DropSelect
                isRequired
                Label={translate('sexualOrientation')}
                itemArray={orientionList}
                placeholder={translate('SelectSexualOrientation')}
                dropStyle={styles.marginVer}
                ErrState={ErrObj.orientErr}
                ErrMsg={ErrObj.orientErrMsg}
                multiSelect
                value={orient}
                onSelect={val => {
                  setOrient(val);
                  setErrObj(old => {
                    return {
                      ...old,
                      orientErr: false,
                      orientErrMsg: '',
                    };
                  });
                }}
              />

              {/* =============================== AGE ============================== */}

              <View style={styles.labelField}>
                <View style={styles.ageLabel}>
                  <Text style={styles.labelTxt}>{translate('Age')}</Text>
                  <Text style={styles.labelTxt}>
                    {ageVal[0]}-{ageVal[1]}
                  </Text>
                </View>

                <RangeSlider
                  containerStyle={{ marginHorizontal: 10 }}
                  value={ageVal}
                  minimumValue={16}
                  maximumValue={99}
                  onValueChange={val => setAgeVal(val)}
                />
              </View>
              {/* =============================== COUNTRY ============================== */}
              <DropSelect
                Label={translate('country')}
                itemArray={CountryList}
                placeholder={translate('SelectCountry')}
                value={CountryVal}
                dropStyle={styles.MarginVer}
                ErrState={ErrObj.CountryErr}
                ErrMsg={ErrObj.CountryErrMsg}
                onSelect={val => {
                  ProvinceListData(val[0]?.id);
                  setCountryId(val[0]?.id);
                  setCountryVal(val);
                  setLoad(true);
                  setProvinceVal([]);
                  setCityVal([]);
                  setErrObj(preVal => {
                    return {
                      ...preVal,
                      CountryErr: false,
                      CountryErrMsg: '',
                    };
                  });
                }}
              />
              <View style={{ marginBottom: 15 }} />
              {/* Province list */}
              {load
                ? ShowLoader()
                : !isEmpty(provinceList) && (
                    <DropSelect
                      multiSelect
                      Label={translate('Province')}
                      LabledInputStyle={styles.MarginVer}
                      itemArray={provinceList}
                      value={ProvinceVal}
                      placeholder={translate('selectProvince')}
                      dropStyle={styles.MarginVer}
                      ErrState={ErrObj.ProvinceErr}
                      ErrMsg={ErrObj.ProvinceErrMsg}
                      onSelect={val => {
                        CityListData(val[0]?.id);
                        setProvinceVal(val);
                        setProvinceId(val[0]?.id);
                        setCityVal([]);
                        setLoadCity(true);
                        setErrObj(oldVal => {
                          return {
                            ...oldVal,
                            ProvinceErr: false,
                            ProvinceErrMsg: '',
                          };
                        });
                      }}
                      isSearch
                    />
                  )}
              <View style={{ marginBottom: 15 }} />
              {/* =============================== CITY ============================== */}
              {loadCity
                ? ShowLoader()
                : !isEmpty(cityList) && (
                    <DropSelect
                      Label={translate('city')}
                      LabledInputStyle={styles.MarginVer}
                      itemArray={cityList}
                      value={CityVal}
                      placeholder={translate('SelectCity')}
                      dropStyle={styles.MarginVer}
                      ErrState={ErrObj.CityErr}
                      ErrMsg={ErrObj.CityErrMsg}
                      onSelect={val => {
                        setCityVal(val);
                        setErrObj(oldVal => {
                          return {
                            ...oldVal,
                            CityErr: false,
                            CityErrMsg: '',
                          };
                        });
                      }}
                      isSearch
                    />
                  )}
              <View style={{ marginBottom: 15 }} />
              {/* =============================== RELATION ============================== */}
              <DropSelect
                Label={translate('looking')}
                itemArray={RelationList}
                multiSelect
                dropStyle={styles.marginVer}
                placeholder={`${translate('select')} ${translate('looking')}`}
                ErrState={ErrObj.RelationErr}
                ErrMsg={ErrObj.RelationErrMsg}
                value={RelationVal}
                onSelect={val => {
                  setRelationVal(val);
                  setErrObj(old => {
                    return {
                      ...old,
                      RelationErr: false,
                      RelationErrMsg: '',
                    };
                  });
                }}
                onPress={() =>
                  !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
                }
              />
              {/* =============================== LIMITATION ============================== */}
              <DropSelect
                Label={translate('disabilityLabel')}
                itemArray={LimitationList}
                multiSelect
                dropStyle={styles.marginVer}
                placeholder={translate('SelectLimitation')}
                ErrState={ErrObj.LimitationErr}
                ErrMsg={ErrObj.LimitationErrMsg}
                value={LimitationVal}
                onSelect={val => {
                  setLimitationVal(val);
                  setErrObj(old => {
                    return {
                      ...old,
                      LimitationErr: false,
                      LimitationErrMsg: '',
                    };
                  });
                }}
                isSearch
                onPress={() =>
                  !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
                }
              />
              {/* =============================== LANGUAGE  ============================== */}

              <DropSelect
                Label={translate('language')}
                itemArray={LangList}
                dropStyle={styles.marginVer}
                multiSelect
                value={LangVal}
                ErrState={ErrObj.languageErr}
                ErrMsg={ErrObj.languageErrMsg}
                onPress={() =>
                  !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
                }
                onSelect={val => {
                  setLangVal(val);
                  setErrObj(old => {
                    return {
                      ...old,
                      languageErr: false,
                      languageErrMsg: '',
                    };
                  });
                }}
              />
            </ScrollView>
            <Button
              title={translate('UpdatePreferences')}
              loading={BtnLoader}
              style={{ marginTop: 10 }}
              onPress={HandleUpdateBtn}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Preferences;
