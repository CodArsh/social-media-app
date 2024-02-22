import { View, Text, ScrollView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import translate from '../../lang/lang/Translate';
import RangeSlider from '@components/RangeSlider';
import DropSelect from '@components/DropSelect';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import Loader from '@components/Loader/Loader';

const PreferenceComponent = ({
  ageVal,
  setAgeVal,
  CountryVal,
  setCountryVal,
  CityVal,
  setCityVal,
  ProvinceVal,
  setProvinceVal,
  LimitationVal,
  setLimitationVal,
  HobbiesVal,
  setHobbiesVal,
  RelVal,
  setRelVal,
  LanguageVal,
  setLanguageVal,
  GenderVal,
  setGenderVal,
  orient,
  setOrient,
}) => {
  const scrollViewRef = useRef();
  const IOS = Platform.OS === 'ios';

  const { languageData } = useSelector(state => state.language);
  const [CountryList, setCountryList] = useState([]);
  const [ProvinceList, setProvinceList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [LimitationList, setLimitationList] = useState([]);
  const [HobbiesList, setHobbiesList] = useState([]);
  const [LangList, setLangList] = useState([]);
  const [RelList, setRelList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [orientionList, setOrientationList] = useState([]);
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
  const LanguageListData = async countryID => {
    setCityList([]);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.LangList}?country_id=${countryID}`,
        'GET',
      );
      if (res?.status) {
        setLangList(res?.data);
      } else {
        setLangList([]);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:95 ⏩ ProvinceListData ⏩ error:',
        error,
      );
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
        '📌 ⏩ file: index.js:95 ⏩ ProvinceListData ⏩ error:',
        error,
      );
    }
  };

  const CityListData = async provinceID => {
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.cityList}?province_id=${provinceID}&language_id=${languageData}`,
        'GET',
      );
      if (res?.status) {
        setLoadCity(false);
        setProvinceList(res?.data);
        setCityList(res?.data);
      } else {
        setLoadCity(false);
        setProvinceList(res?.data);
        setCityList([]);
      }
    } catch (error) {
      setLoadCity(false);
      console.log('📌 ⏩ file: index.js:114 ⏩ CityListData ⏩ error:', error);
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

  const HobbiesApi = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.hobby}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setHobbiesList(res?.data);
      } else {
        setHobbiesList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  const RelationApi = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.relationShip}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setRelList(res?.data);
      } else {
        setRelList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  useEffect(() => {
    CountryListAPI();
    LimitationListAPI();
    HobbiesApi();
    getOriention();
    genderListAPI();
    LanguageListData();
    RelationApi();
    if (!isEmpty(CountryVal)) {
      ProvinceListData(CountryVal[0]?.id);
    }
    if (!isEmpty(ProvinceVal)) {
      CityListData(ProvinceVal[0]?.id);
    }

    return () => {
      null;
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
      {/* =============================== LOOKING FOR ============================== */}
      <DropSelect
        Label={translate('Gender')}
        itemArray={genderList}
        dropStyle={styles.marginVer}
        placeholder={translate('SelectGender')}
        value={GenderVal}
        multiSelect
        onSelect={val => setGenderVal(val)}
      />
      {/* orientation */}

      <DropSelect
        Label={translate('sexualOrientation')}
        itemArray={orientionList}
        placeholder={translate('SelectSexualOrientation')}
        multiSelect
        value={orient}
        onSelect={val => setOrient(val)}
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
        dropStyle={styles.marginVer}
        placeholder={translate('SelectCountry')}
        value={CountryVal}
        onSelect={val => {
          ProvinceListData(val[0]?.id);
          setCountryVal(val);
          setLoad(true);
          setProvinceVal([]);
          setCityVal([]);
        }}
      />
      {/* =============================== PROVINCE FIELD =============================== */}
      {load
        ? ShowLoader()
        : !isEmpty(ProvinceList) && (
            <DropSelect
              Label={translate('Province')}
              multiSelect
              itemArray={ProvinceList}
              dropStyle={styles.marginVer}
              placeholder={translate('selectProvince')}
              value={ProvinceVal}
              onSelect={val => {
                CityListData(val[0]?.id);
                setProvinceVal(val);
                setLoadCity(true);
                setCityVal([]);
              }}
              isSearch
            />
          )}
      {/* =============================== CITY ============================== */}
      {loadCity
        ? ShowLoader()
        : !isEmpty(CityList) && (
            <DropSelect
              Label={translate('city')}
              itemArray={CityList}
              dropStyle={styles.marginVer}
              placeholder={translate('SelectCity')}
              value={CityVal}
              onSelect={val => setCityVal(val)}
              onPress={() =>
                !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
              }
              isSearch
            />
          )}

      {/* =============================== LIMITATION ============================== */}
      <DropSelect
        Label={translate('Limitation')}
        itemArray={LimitationList}
        dropStyle={styles.marginVer}
        placeholder={translate('SelectLimitation')}
        value={LimitationVal}
        onSelect={val => setLimitationVal(val)}
        isSearch
        onPress={() =>
          !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
        }
        multiSelect
      />
      {/* =============================== LANGUAGE 0R HOBBIES ============================== */}

      <DropSelect
        Label={translate('language')}
        itemArray={LangList}
        multiSelect
        dropStyle={styles.marginVer}
        placeholder={translate('sLanguage')}
        value={LanguageVal}
        onSelect={val => setLanguageVal(val)}
        onPress={() =>
          !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
        }
      />

      {/* =============================== RELATIONSHIP ============================== */}

      <DropSelect
        Label={translate('looking')}
        itemArray={RelList}
        multiSelect
        dropStyle={styles.marginVer}
        placeholder={`${translate('select')} ${translate('looking')}`}
        value={RelVal}
        onSelect={val => setRelVal(val)}
        onPress={() =>
          !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
        }
      />
    </ScrollView>
  );
};

export default PreferenceComponent;
