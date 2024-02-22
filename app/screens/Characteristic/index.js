import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import Loader from '@components/Loader/Loader';
import styles from './styles';
import DropSelect from '@components/DropSelect';
import LabeledInput from '@components/LabeledInput';
import Button from '@components/Button';
import { isEmpty, isNull } from 'lodash';
import BaseSetting from '@config/setting';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';

const Characteristic = ({ navigation }) => {
  const IOS = Platform.OS === 'ios';
  const dispatch = useDispatch();
  const { setEmptyProfile } = Authentication;
  const scrollViewRef = useRef();
  const errorObj = {
    EyeErr: false,
    EyeErrMsg: '',
    HairErr: false,
    HairErrMsg: '',
    ClothErr: false,
    ClothErrMsg: '',
    PersonalityErr: false,
    PersonalityErrMsg: '',
    RelationErr: false,
    RelationErrMsg: '',
    ReligionErr: false,
    ReligionErrMsg: '',
    SmokerErr: false,
    SmokerErrMsg: '',
    DrinkerErr: false,
    DrinkerErrMsg: '',
    LimitationErr: false,
    LimitationErrMsg: '',
  };
  const { emptyProfile } = useSelector(state => {
    return state.auth;
  });
  ('');
  const { languageData } = useSelector(state => state.language);
  const [ErrObj, setErrObj] = useState(errorObj);
  const [PageLoader, setPageLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);

  const [EyeVal, setEyeVal] = useState([]);
  const [HairVal, setHairVal] = useState([]);
  const [ClothVal, setClothVal] = useState('');
  const [PersonalityVal, setPersonlityVal] = useState([]);
  const [RelationVal, setRelationVal] = useState([]);
  const [ReligionVal, setReligionVal] = useState([]);
  const [SmokerVal, setSmokerVal] = useState([]);
  const [DrinkerVal, setDrinkerVal] = useState([]);
  const [LimitationVal, setLimitationVal] = useState([]);

  const [eyeColorList, setEyeColorList] = useState([]);
  const [HairColorList, setHairColorList] = useState([]);
  const [PersonalityList, setPersonlityList] = useState([]);
  const [RelationList, setRelationList] = useState([]);
  const [ReligionList, setReligionList] = useState([]);
  const [DrinkerList, setDrinkerList] = useState([]);
  const [SmokerList, setSmokerList] = useState([]);
  const [LimitationList, setLimitationList] = useState([]);


  /* ============================== DEFAULT DATA ============================== */
  const DefaultCharacterData = async () => {
    setPageLoader(true);
    const endpoint = BaseSetting.endpoints.characterView;
    try {
      const res = await getApiData(endpoint, 'GET');

      if (res?.status) {
        setEyeVal(res?.data?.eyes || []);
        setHairVal(res?.data?.hair || []);
        setClothVal(res?.data?.clothing_style);
        setPersonlityVal(res?.data?.personality || []);
        setRelationVal(res?.data?.relationship || []);
        setReligionVal(res?.data?.religion || []);
        setSmokerVal(res?.data?.smoker || []);
        setDrinkerVal(res?.data?.drinker || []);
        setLimitationVal(res?.data?.limitation || []);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.log(
        '📌 ⏩ file: index.js:94 ⏩ DefaultCharacterData ⏩ error:',
        error,
      );
    }
  };

  /* ============================= EYE COLOR LIST ============================= */
  const EyeColorAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.eyeColor}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setEyeColorList(res?.data);
      } else {
        setEyeColorList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };

  /* ============================= HAIR COLOR LIST ============================= */
  const HairColorAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.hairColor}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setHairColorList(res?.data);
      } else {
        setHairColorList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };

  /* ============================= PERONALITY LIST ============================= */
  const PersonalityAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.personality}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setPersonlityList(res?.data);
      } else {
        setPersonlityList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };

  /* ============================= RELATIONSHIP LIST ============================= */
  const RelationShipAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.relationShip}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setRelationList(res?.data);
      } else {
        setRelationList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };

  /* ============================= RELIGION LIST ============================= */
  const ReligionAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.religion}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setReligionList(res?.data);
      } else {
        setReligionList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };
  /* ============================= DRINKER LIST ============================= */
  const DrinkerAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.drink}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setDrinkerList(res?.data);
      } else {
        setDrinkerList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };
  /* ============================= SMOKER LIST ============================= */
  const SmokerAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.smoker}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setSmokerList(res?.data);
      } else {
        setSmokerList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };
  /* ============================= LIMITATION LIST ============================= */
  const LimitationAPI = async () => {
    const endpoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.limitation}&language_id=${languageData}`;
    try {
      const res = await getApiData(endpoint, 'GET');
      if (res?.status) {
        setLimitationList(res?.data);
      } else {
        setLimitationList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:76 ⏩ EyeColorAPI ⏩ error:', error);
    }
  };

  useEffect(() => {
    DefaultCharacterData();
    EyeColorAPI();
    HairColorAPI();
    PersonalityAPI();
    RelationShipAPI();
    ReligionAPI();
    DrinkerAPI();
    LimitationAPI();
    SmokerAPI();
    return () => {
      null;
    };
  }, []);

  /* ============================= HANDLE UPDATE BTN ============================ */
  const HandleUpdateBtn = () => {
    const error = { ...ErrObj };
    let Valid = true;

    /* ================== EYE COLOR ================= */
    if (isEmpty(EyeVal) || isNull(EyeVal)) {
      Valid = false;
      error.EyeErr = true;
      error.EyeErrMsg = translate('reqEye');
    }

    /* ================= HAIR COLOR ================= */
    if (isEmpty(HairVal) || isNull(HairVal)) {
      Valid = false;
      error.HairErr = true;
      error.HairErrMsg = translate('reqHair');
    }

    /* =============== CLOTHING STYLE =============== */
    if (isEmpty(ClothVal?.trim()) || isNull(ClothVal)) {
      Valid = false;
      error.ClothErr = true;
      error.ClothErrMsg = translate('reqCloth');
    }

    /* ================= PERSONALITY ================ */
    if (isEmpty(PersonalityVal) || isNull(PersonalityVal)) {
      Valid = false;
      error.PersonalityErr = true;
      error.PersonalityErrMsg = translate('reqPer');
    }

    /* ================ RELATIONSHIP ================ */
    if (isEmpty(RelationVal) || isNull(RelationVal)) {
      Valid = false;
      error.RelationErr = true;
      error.RelationErrMsg = translate('reqRelation');
    }

    /* ================== RELIGION ================== */
    if (isEmpty(ReligionVal) || isNull(ReligionVal)) {
      Valid = false;
      error.ReligionErr = true;
      error.ReligionErrMsg = translate('reqReligion');
    }

    /* =================== SMOKER =================== */
    if (isEmpty(SmokerVal) || isNull(SmokerVal)) {
      Valid = false;
      error.SmokerErr = true;
      error.SmokerErrMsg = translate('reqSmoker');
    }

    /* =================== DRINKER ================== */
    if (isEmpty(DrinkerVal) || isNull(DrinkerVal)) {
      Valid = false;
      error.DrinkerErr = true;
      error.DrinkerErrMsg = translate('reqDrink');
    }

    /* ================= LIMITATION ================= */
    if (isEmpty(LimitationVal) || isNull(LimitationVal)) {
      Valid = false;
      error.LimitationErr = true;
      error.LimitationErrMsg = translate('reqLimitation');
    }

    setErrObj(error);
    if (Valid) {
      UpdateApi();
    } else {
      Toast.show({
        type: 'error',
        text1: translate('fillOutRequired'),
      });
    }
  };
  const CheckEmptyProfile = () => {
    if (emptyProfile?.interest) {
      navigation.replace('Interest');
    } else if (emptyProfile?.preference) {
      navigation.replace('Preferences');
    } else {
      navigation.replace('Home');
    }
  };
  const UpdateApi = async () => {
    setBtnLoader(true);
    const NewLimit = LimitationVal.map(item => item?.id?.toString());

    const endPoint = BaseSetting.endpoints.CharacterUpdate;
    const params = {
      'UserCharacter[eyes]': EyeVal[0]?.id?.toString(),
      'UserCharacter[hair]': HairVal[0]?.id?.toString(),
      'UserCharacter[clothing_style]': ClothVal,
      'UserCharacter[personality]': PersonalityVal[0]?.id?.toString(),
      'UserCharacter[relationship]': RelationVal[0]?.id?.toString(),
      'UserCharacter[religion]': ReligionVal[0]?.id?.toString(),
      'UserCharacter[smoker]': SmokerVal[0]?.id?.toString(),
      'UserCharacter[drinker]': DrinkerVal[0]?.id?.toString(),
    };
    NewLimit?.map((v, i) => {
      return (params[`UserCharacter[limitation][${i}]`] = v);
    });

    try {
      const res = await getApiDataProgress(endPoint, 'POST', params);
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        if (emptyProfile?.character) {
          dispatch(
            setEmptyProfile({
              profile: emptyProfile?.profile,
              character: false,
              interest: emptyProfile?.interest,
              preference: emptyProfile?.preference,
            }),
          );
          CheckEmptyProfile();
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
  return (
    <View style={styles.container}>
      <HeaderBar HeaderText={translate('Characteristic')} />
      {PageLoader ? (
        <View style={styles.LoaderCon}>
          <Loader />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={IOS ? 'padding' : 'height'}
          style={styles.main}
          keyboardVerticalOffset={IOS ? -60 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* =============================== EYE'S COLOR FIELD =============================== */}

            <DropSelect
              Label={translate('eyeColor')}
              itemArray={eyeColorList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('selecteyeColor')}
              ErrState={ErrObj.EyeErr}
              ErrMsg={ErrObj.EyeErrMsg}
              value={EyeVal}
              onSelect={val => {
                setEyeVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    EyeErr: false,
                    EyeErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== HAIR'S COLOR FIELD =============================== */}
            <DropSelect
              Label={translate('Haircolor')}
              itemArray={HairColorList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectHairColor')}
              ErrState={ErrObj.HairErr}
              ErrMsg={ErrObj.HairErrMsg}
              value={HairVal}
              onSelect={val => {
                setHairVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    HairErr: false,
                    HairErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== CLOTHING STYLE FIELD =============================== */}
            <LabeledInput
              Label={translate('Clothingstyle')}
              LabledInputStyle={styles.marginVer}
              isRequired
              placeholder={translate('EnterClothingStyle')}
              showError={ErrObj.ClothErr}
              errorText={ErrObj.ClothErrMsg}
              value={ClothVal}
              onChangeText={val => {
                setClothVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    ClothErr: false,
                    ClothErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== PERSONALITY FIELD =============================== */}
            <DropSelect
              Label={translate('Personality')}
              itemArray={PersonalityList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectPersonality')}
              ErrState={ErrObj.PersonalityErr}
              ErrMsg={ErrObj.PersonalityErrMsg}
              value={PersonalityVal}
              onSelect={val => {
                setPersonlityVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    PersonalityErr: false,
                    PersonalityErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== RELATIONSHIP FIELD =============================== */}
            <DropSelect
              Label={translate('looking')}
              itemArray={RelationList}
              dropStyle={styles.marginVer}
              isRequired
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
            />

            {/* =============================== RELIGION FIELD =============================== */}
            <DropSelect
              Label={translate('Religion')}
              itemArray={ReligionList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectReligion')}
              ErrState={ErrObj.ReligionErr}
              ErrMsg={ErrObj.ReligionErrMsg}
              value={ReligionVal}
              onSelect={val => {
                setReligionVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    ReligionErr: false,
                    ReligionErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== SMOKER FIELD =============================== */}
            <DropSelect
              Label={translate('Smoker')}
              itemArray={SmokerList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectOption')}
              ErrState={ErrObj.SmokerErr}
              ErrMsg={ErrObj.SmokerErrMsg}
              value={SmokerVal}
              onSelect={val => {
                setSmokerVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    SmokerErr: false,
                    SmokerErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== DRINKER FIELD =============================== */}
            <DropSelect
              Label={translate('Drinker')}
              itemArray={DrinkerList}
              dropStyle={styles.marginVer}
              isRequired
              placeholder={translate('SelectOption')}
              ErrState={ErrObj.DrinkerErr}
              ErrMsg={ErrObj.DrinkerErrMsg}
              value={DrinkerVal}
              onSelect={val => {
                setDrinkerVal(val);
                setErrObj(old => {
                  return {
                    ...old,
                    DrinkerErr: false,
                    DrinkerErrMsg: '',
                  };
                });
              }}
              onPress={() =>
                !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
              }
            />

            {/* =============================== LIMITATION FIELD =============================== */}
            <DropSelect
              Label={translate('disabilityLabel')}
              itemArray={LimitationList}
              dropStyle={styles.marginVer}
              isRequired
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
              multiSelect
              onPress={() =>
                !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
              }
            />
          </ScrollView>

          <Button
            title={translate('UpdateCharacteristic')}
            loading={BtnLoader}
            style={{ marginTop: 10 }}
            onPress={HandleUpdateBtn}
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Characteristic;
