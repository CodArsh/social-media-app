/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import style from './style';
import Button from '@components/Button';
import LabeledInput from '@components/LabeledInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Images } from '@config';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';
import _, { isEmpty } from 'lodash';
import { CustomIcon } from '../../config/LoadIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import translate from '../../lang/lang/Translate';
import DropSelect from '@components/DropSelect';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ImagePicker from '../../lib/react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import CheckButton from '@components/CheckButton';
import { useSelector } from 'react-redux';
import Picker from '@components/DatePicker';
import moment from 'moment';
import Loader from '@components/Loader/Loader';

const errorObj = {
  fNameErr: false,
  nNameErr: false,
  fNameMsg: '',
  nNameMsg: '',
  bdayErr: false,
  bdayMsg: '',
  hobbiesErr: false,
  hobbiesMsg: '',
  disabilityErr: false,
  disabilityMsg: '',
  relationErr: false,
  relationMsg: '',
  religionErr: false,
  religionMsg: '',
  bioErr: false,
  bioMsg: '',
  countryErr: false,
  countryMsg: '',
  cityErr: false,
  cityMsg: '',
  locationErr: false,
  locationMsg: '',
  emailErr: false,
  emailMsg: '',
  cemailErr: false,
  cemailMsg: '',
  setPassErr: false,
  setPassMsg: '',
  imgErr: false,
  imgMsg: '',
  genderErr: false,
  genderErrMsg: '',
  orientationErr: false,
  orientationErrMsg: '',
  termsErr: false,
};

export const RenderSelectOptionsModal = props => {
  const { refRBSheet, title, optionsArray } = props;
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={250}
      dragFromTopOnly={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {
          backgroundColor: BaseColors.primary,
          width: 50,
        },
        container: {
          backgroundColor: 'white',
          borderTopRightRadius: 45,
          borderTopLeftRadius: 45,
        },
      }}
    >
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '700',
          paddingVertical: 10,
        }}
      >
        {title}
      </Text>

      {!_.isEmpty(optionsArray) && _.isArray(optionsArray)
        ? optionsArray.map((it, ii) => {
            return (
              <View>
                <TouchableOpacity activeOpacity={0.5} onPress={it.handleClick}>
                  <View style={style.modalRowView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FAIcon
                        style={style.leftIcon}
                        size={25}
                        color={BaseColors.textGrey}
                        name={it.optionIcon}
                      />
                      <View
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        <Text style={[style.modelTxt]}>{it.optionTitle}</Text>
                      </View>
                    </View>
                    <AIcon
                      size={20}
                      color={BaseColors.borderColor}
                      name="right"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        : null}
    </RBSheet>
  );
};

const SignUp = ({ navigation, route }) => {
  const IOS = Platform.OS === 'ios';

  const { languageData } = useSelector(state => state.language);
  const LinkingToken = route?.params?.token || '';

  const [btnLoader, setBtnLoader] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [activePage, setActivePAge] = useState(1);
  const [fName, setFName] = useState('');
  const [nickName, setNickName] = useState('');
  const [bio, setbio] = useState('');

  const [errObj, setErrObj] = useState(errorObj);
  const [genderVal, setGenderVal] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [orientationVal, setOrientationVal] = useState([]);
  const [orientationList, setOrientationList] = useState([]);
  const [BirthVal, setBirthVal] = useState('');
  const [pickerSize, setPickerSize] = useState(false);
  const [hobbies, setHobbies] = useState([]);
  const [disabilities, setdisabilities] = useState([]);

  const [hobbiesList, setHobbiesList] = useState([]);
  const [RelationList, setRelationList] = useState([]);
  const [disabilityList, setdisabilityList] = useState([]);

  const [relation, setrelation] = useState([]);
  const [religion, setreligion] = useState([]);
  const [religionList, setreligionList] = useState([]);

  const [country, setCountry] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [province, setProvince] = useState([]);
  const [provinceList, setProvinceList] = useState([]);

  const [email, setemail] = useState('');
  const [cEmail, setcEmail] = useState('');
  const [setPassword, setsetPassword] = useState('');

  const [imageFile, setImageFile] = useState({});
  const [termsVal, setTermsVal] = useState(false);
  const [nicknameExist, setNickNameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadCity, setLoadCity] = useState(false);

  const ShowLoader = () => {
    return (
      <View style={{ marginTop: 25 }}>
        <Loader small />
      </View>
    );
  };

  const refPhotoRBSheet = useRef();
  useEffect(() => {
    getHobbiesList();
    GenderList();
    OrientationList();
    getDisabilityList();
    getReligionList();
    CountryListData();
    RelationShipAPI();
  }, []);

  useEffect(() => {
    if (!isEmpty(LinkingToken)) {
      verifyEmail();
    }
  }, [LinkingToken]);

  async function verifyEmail() {
    setpageLoader(true);
    const endPoint = `${BaseSetting.endpoints.verifyEmail}?token=${LinkingToken}&?language_id=${languageData}`;

    try {
      const resp = await getApiData(endPoint, 'GET', {});
      if (resp?.status) {
        Toast.show({
          text1: resp?.message,
          type: 'success',
        });
        setActivePAge(10);
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setpageLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:227 ⏩ verifyEmail ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setpageLoader(false);
    }
  }

  async function getHobbiesList() {
    // setBtnLoader(true);
    let endPoints = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.hobby}&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');

      if (response?.status) {
        setHobbiesList(response?.data);
        // setBtnLoader(false);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:247 ⏩ getHobbiesList ⏩ error:',
        error,
      );
      // setBtnLoader(false);
    }
  }
  const GenderList = async () => {
    let endPoints = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.gender}&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');

      if (response?.status) {
        setGenderList(response?.data);
      } else {
        setGenderList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:262 ⏩ GenderList ⏩ error:', error);
    }
  };
  const OrientationList = async () => {
    let endPoints = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.orientation}&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');

      if (response?.status) {
        setOrientationList(response?.data);
      } else {
        setOrientationList([]);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:276 ⏩ OrientationList ⏩ error:',
        error,
      );
    }
  };

  async function getDisabilityList() {
    // setBtnLoader(true);
    let endPoints = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.limitation}&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');

      if (response?.status) {
        setdisabilityList(response?.data);
        // setBtnLoader(false);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:297 ⏩ getDisabilityList ⏩ error:',
        error,
      );
      // setBtnLoader(false);
    }
  }

  async function getReligionList() {
    // setBtnLoader(true);
    let endPoints = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.religion}&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');

      if (response?.status) {
        setreligionList(response?.data);
        // setBtnLoader(false);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:316 ⏩ getReligionList ⏩ error:',
        error,
      );
      // setBtnLoader(false);
    }
  }

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

  function handleBack() {
    if (activePage > 1 && activePage < 9) {
      setActivePAge(activePage - 1);
    } else if (activePage === 1) {
      navigation.goBack();
    } else if (activePage >= 9) {
      clearData();
      setActivePAge(1);
    }
  }
  const verifyNickName = async name => {
    const endPoint = `${BaseSetting.endpoints.checkNickname}?name=${name}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setNickNameExist(true);
      } else {
        setNickNameExist(false);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:659 ⏩ CountryListData ⏩ error:',
        error,
      );
    }
  };

  const verifyEmailExist = async emailId => {
    const endPoint = `${BaseSetting.endpoints.checkEmail}?email=${emailId}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setEmailExist(true);
      } else {
        setEmailExist(false);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:659 ⏩ CountryListData ⏩ error:',
        error,
      );
    }
  };
  function Validation() {
    const error = { ...errObj };
    let valid = true;

    if (activePage === 1) {
      if (isEmpty(fName.trim())) {
        valid = false;
        error.fNameErr = true;
        error.fNameMsg = translate('fullnameErr');
      }
      if (fName.length > 30) {
        valid = false;
        error.fNameErr = true;
        error.fNameMsg = translate('fullnameMaxChar');
      }

      if (isEmpty(nickName.trim())) {
        valid = false;
        error.nNameErr = true;
        error.nNameMsg = translate('nicknameErr');
      }

      if (!isEmpty(nickName.trim()) && !nicknameExist) {
        valid = false;
        error.nNameErr = true;
        error.nNameMsg = translate('nicknameExist');
      }
    }

    if (activePage === 2) {
      if (isEmpty(genderVal)) {
        valid = false;
        error.genderErr = true;
        error.genderErrMsg = translate('SelectGender');
      }

      if (isEmpty(orientationVal)) {
        valid = false;
        error.orientationErr = true;
        error.orientationErrMsg = translate('SelectSexualOrientation');
      }
    }
    if (activePage === 3) {
      const today = new Date();
      const birthYear = Number(BirthVal.split('-')[2]);
      const currentYear =
        Number(moment(today).format('DD-MM-YYYY').split('-')[2]) - 16;
      if (!(birthYear <= currentYear)) {
        valid = false;
        error.bdayErr = true;
        error.bdayMsg = 'Your age must be 16+ years';
      }
      if (BirthVal === '') {
        valid = false;
        error.bdayErr = true;
        error.bdayMsg = translate('SelectBirth');
      }
    }

    if (activePage === 4) {
      if (isEmpty(hobbies)) {
        valid = false;
        error.hobbiesErr = true;
        error.hobbiesMsg = translate('hobbiesErr');
      }
      if (isEmpty(disabilities)) {
        valid = false;
        error.disabilityErr = true;
        error.disabilityMsg = translate('disabilityErr');
      }
    }

    if (activePage === 5) {
      if (isEmpty(relation)) {
        valid = false;
        error.relationErr = true;
        error.relationMsg = translate('relationshipErr');
      }

      if (isEmpty(religion)) {
        valid = false;
        error.religionErr = true;
        error.religionMsg = translate('religionErr');
      }
      if (isEmpty(bio.trim())) {
        valid = false;
        error.bioErr = true;
        error.bioMsg = translate('bioErr');
      }
    }

    if (activePage === 6) {
      if (isEmpty(country)) {
        valid = false;
        error.countryErr = true;
        error.countryMsg = translate('countryErr');
      }

      if (isEmpty(province)) {
        valid = false;
        error.locationErr = true;
        error.locationMsg = translate('provinceErr');
      }
    }

    if (activePage === 7) {
      let email_Regex = BaseSetting?.emailRegex;
      if (isEmpty(email.trim())) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = translate('erroremailmsg');
      } else if (!isEmpty(email.trim()) && !email_Regex.test(email)) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = translate('wrongemail');
      }
      if (!isEmpty(email.trim()) && !emailExist) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = translate('emailExist');
      }

      if (isEmpty(cEmail)) {
        valid = false;
        error.cemailErr = true;
        error.cemailMsg = translate('confirmemail');
      } else if (!isEmpty(cEmail.trim()) && !email_Regex.test(cEmail)) {
        valid = false;
        error.cemailErr = true;
        error.cemailMsg = translate('wrongemail');
      } else if (email !== cEmail) {
        valid = false;
        error.cemailErr = true;
        error.cemailMsg = translate('emailmatchErr');
      }

      if (isEmpty(setPassword)) {
        valid = false;
        error.setPassErr = true;
        error.setPassMsg = translate('errorpasswordmsg');
      } else if (setPassword.length < 6 || setPassword.length > 15) {
        valid = false;
        error.setPassErr = true;
        error.setPassMsg = translate('wrongpassword');
      }

      if (termsVal === false) {
        valid = false;
        Toast.show({
          text1: translate('checkBox'),
          type: 'error',
        });
        error.termsErr = true;
      }
    }

    if (activePage === 8) {
      if (_.isEmpty(imageFile)) {
        valid = false;
        error.imgErr = true;
        error.imgMsg = translate('profileimgErr');
      }
    }

    setErrObj(error);
    if (valid) {
      if (activePage < 8) {
        setActivePAge(activePage + 1);
      } else if (activePage === 8) {
        CreateProfile();
      }
    }
  }

  const optionsArray = [
    {
      id: 1,
      optionTitle: translate('SelectfromGallery'),
      handleClick: () => {
        openGallery();
      },
      optionIcon: 'photo',
    },
    {
      id: 1,
      optionTitle: translate('OpenCamera'),
      handleClick: () => {
        openCamera();
      },
      optionIcon: 'camera',
    },
  ];
  const openCamera = async () => {
    if (IOS) {
      ImagePicker.openCamera({
        width: 1500,
        height: 1500,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        refPhotoRBSheet.current.close();
        // setImage(image.path);

        const imgFile = {
          uri: image?.path,
          name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
          type: image.mime,
        };

        setErrObj({
          ...errObj,
          imgErr: false,
          imgMsg: '',
        });
        setImageFile(imgFile);
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Dottie App Camera Permission',
            message:
              'Dottie App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.openCamera({
            width: 1500,
            height: 1500,
            cropping: true,
            cropperCircleOverlay: true,
          }).then(image => {
            refPhotoRBSheet.current.close();
            // setImage(image.path);

            const imgFile = {
              uri: image?.path,
              name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
              type: image.mime,
            };

            setErrObj({
              ...errObj,
              imgErr: false,
              imgMsg: '',
            });
            setImageFile(imgFile);
          });
        } else {
          refPhotoRBSheet.current.close();
        }
      } catch (err) {
        console.log('📌 ⏩ file: index.js:565 ⏩ openCamera ⏩ err:', err);
      }
    }
  };

  // function for openGallery
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 1500,
      height: 1500,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      refPhotoRBSheet.current.close();
      // setImage(image.path);

      const imgFile = {
        uri: image?.path,
        name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
        type: image.mime,
      };
      setErrObj({
        ...errObj,
        imgErr: false,
        imgMsg: '',
      });
      setImageFile(imgFile);
    });
  };

  const CreateProfile = async () => {
    setBtnLoader(true);

    let hobbiesArr = hobbies.map(a => a?.id?.toString());
    let disArr = disabilities.map(a => a?.id?.toString());
    let orinArr = orientationVal.map(a => a?.id?.toString());

    const params = {
      'SignupForm[name]': fName.trim(),
      'SignupForm[nick_name]': nickName.trim(),
      'SignupForm[gender]': genderVal[0]?.id?.toString(),
      'SignupForm[birth_date]': BirthVal?.toString(),
      'SignupForm[relationship]': relation[0].id?.toString(),
      'SignupForm[religion]': religion[0].id?.toString(),
      'SignupForm[bio]': bio.trim(),
      'SignupForm[country]': country[0]?.id?.toString(),
      'SignupForm[province]': province[0]?.id?.toString(),
      'SignupForm[city]': city[0]?.id?.toString(),
      'SignupForm[email]': email,
      'SignupForm[confirm_email]': cEmail,
      'SignupForm[password]': setPassword,
      'SignupForm[profile_photo]': imageFile,
      'SignupForm[terms_condition]': termsVal ? '1' : '0',
    };

    hobbiesArr?.map((v, i) => {
      return (params[`SignupForm[hobbies][${i}]`] = v);
    });

    disArr?.map((v, i) => {
      return (params[`SignupForm[limitation][${i}]`] = v);
    });

    orinArr?.map((v, i) => {
      return (params[`SignupForm[sexual_orientation][${i}]`] = v);
    });

    try {
      const resp = await getApiDataProgress(
        `${BaseSetting.endpoints.createProfile}?language_id=${languageData}`,
        'POST',
        params,
      );
      if (resp?.status) {
        Toast.show({
          text1: resp?.message,
          type: 'success',
        });
        setActivePAge(9);
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
        setBtnLoader(false);
      }
      setBtnLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:630 ⏩ CreateProfile ⏩ error:', error);
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      setBtnLoader(false);
    }
  };

  const CountryListData = async () => {
    const endPoint = `${BaseSetting.endpoints.countryList}?language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setCountryList(res?.data);
      } else {
        setCountryList([]);
      }
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:659 ⏩ CountryListData ⏩ error:',
        error,
      );
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
        '📌 ⏩ file: index.js:674 ⏩ ProvinceListData ⏩ error:',
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

  function clearData() {
    setFName('');
    setNickName('');
    setGenderVal([]);
    setOrientationVal([]);
    setBirthVal('');
    setrelation([]);
    setreligion([]);
    setHobbies([]);
    setdisabilities([]);
    setbio('');
    setCountry([]);
    setCountryList([]);
    setCity([]);
    setCityList([]);
    setProvince([]);
    setProvinceList([]);
    setemail('');
    setcEmail('');
    setsetPassword('');
    setImageFile({});
  }

  return (
    <>
      {pageLoader ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator color={BaseColors.primary} size="large" />
        </View>
      ) : (
        <View style={style.container}>
          {activePage !== 9 && (
            <View style={style.header}>
              <TouchableOpacity
                style={style.headerBack}
                activeOpacity={BaseSetting.buttonOpacity}
                onPress={handleBack}
              >
                <CustomIcon
                  name={'arrow'}
                  size={20}
                  color={BaseColors.secondary}
                />
              </TouchableOpacity>
              {activePage < 9 && (
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    color: BaseColors.secondary,
                    fontFamily: FontFamily.medium,
                  }}
                >{`${translate('step')} ${activePage} OF 8`}</Text>
              )}
            </View>
          )}
          {activePage === 1 && (
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <View style={style.inputmain}>
                <View>
                  <LabeledInput
                    LabledTextStyle={style.labelTxt}
                    isRequired
                    Label={translate('fullnameLabel')}
                    placeholder={translate('fullnamePH')}
                    showError={errObj.fNameErr}
                    errorText={errObj.fNameMsg}
                    value={fName}
                    onChangeText={txt => {
                      setFName(txt);
                      setErrObj({
                        ...errObj,
                        fNameErr: false,
                        fNameMsg: '',
                      });
                    }}
                  />
                </View>
                <View style={{ marginVertical: 20 }}>
                  <LabeledInput
                    isRequired
                    LabledTextStyle={style.labelTxt}
                    Label={translate('nicknameLabel')}
                    placeholder={translate('nicknamePH')}
                    showError={errObj.nNameErr}
                    errorText={errObj.nNameMsg}
                    value={nickName}
                    onChangeText={txt => {
                      verifyNickName(txt);
                      setNickName(txt);
                      setErrObj({
                        ...errObj,
                        nNameErr: false,
                        nNameMsg: '',
                      });
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
          {activePage === 2 && (
            <ScrollView contentContainerStyle={style.subContainer}>
              <DropSelect
                Label={translate('chooseGenderTxt')}
                ErrState={errObj.genderErr}
                ErrMsg={errObj.genderErrMsg}
                itemArray={genderList}
                placeholder={translate('SelectGender')}
                value={genderVal}
                onSelect={val => {
                  setErrObj({
                    ...errObj,
                    genderErr: false,
                    genderErrMsg: '',
                  });
                  setGenderVal(val);
                }}
                isRequired
              />

              <DropSelect
                Label={translate('sexualOrientation')}
                multiSelect
                ErrState={errObj.orientationErr}
                ErrMsg={errObj.orientationErrMsg}
                itemArray={orientationList}
                placeholder={translate('SelectSexualOrientation')}
                value={orientationVal}
                onSelect={val => {
                  setErrObj({
                    ...errObj,
                    orientationErr: false,
                    orientationErrMsg: '',
                  });
                  setOrientationVal(val);
                }}
                isRequired
                LabelContainerStyle={{ marginTop: 20 }}
              />
            </ScrollView>
          )}
          {activePage === 3 && (
            <View style={style.subContainer}>
              <View style={style.labelCon}>
                <Text style={[style.labelTxt]}>{translate('bdayLabel')} </Text>
                <Text style={style.astrick}>*</Text>
              </View>
              <Picker
                defaultValue={BirthVal}
                onDateSelect={val => {
                  setBirthVal(moment(val).format('DD-MM-YYYY'));
                  setErrObj(pre => {
                    return {
                      ...pre,
                      bdayErr: false,
                      bdayMsg: '',
                    };
                  });
                }}
                containerStyle={
                  pickerSize && IOS && { height: BaseSetting.nHeight * 0.25 }
                }
                onPress={() => IOS && setPickerSize(true)}
                onClose={() => IOS && setPickerSize(false)}
              />
              {errObj?.bdayErr && (
                <View style={style.errBox}>
                  <Text style={style.errText} numberOfLines={2}>
                    {errObj?.bdayMsg}
                  </Text>
                </View>
              )}
            </View>
          )}
          {activePage === 4 && (
            <ScrollView style={style.subContainer}>
              <View>
                <View style={style.labelCon}>
                  <Text style={[style.labelTxt]}>
                    {translate('hobbiesLabel')}{' '}
                  </Text>
                  <Text style={style.astrick}>*</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <DropSelect
                    multiSelect
                    ErrState={errObj.hobbiesErr}
                    ErrMsg={errObj.hobbiesMsg}
                    itemArray={hobbiesList}
                    placeholder={translate('hobbiesPh')}
                    value={hobbies}
                    // dropStyle={style.flexItem}
                    onSelect={val => {
                      setErrObj({
                        ...errObj,
                        hobbiesErr: false,
                        hobbiesMsg: '',
                      });
                      setHobbies(val);
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <View style={style.labelCon}>
                    <Text style={[style.labelTxt]}>
                      {translate('disabilityLabel')}{' '}
                    </Text>
                    <Text style={style.astrick}>*</Text>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <View style={style.flexCon}>
                    <DropSelect
                      multiSelect
                      ErrState={errObj.disabilityErr}
                      ErrMsg={errObj.disabilityMsg}
                      itemArray={disabilityList}
                      placeholder={translate('disabilityPh')}
                      value={disabilities}
                      // dropStyle={style.flexItem}
                      onSelect={val => {
                        setErrObj({
                          ...errObj,
                          disabilityErr: false,
                          disabilityMsg: '',
                        });
                        setdisabilities(val);
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
          {activePage === 5 && (
            <ScrollView style={style.subContainer}>
              <View>
                <View style={style.labelCon}>
                  <Text style={[style.labelTxt]}>{translate('looking')} </Text>
                  <Text style={style.astrick}>*</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <DropSelect
                    ErrState={errObj.relationErr}
                    ErrMsg={errObj.relationMsg}
                    itemArray={RelationList}
                    placeholder={`${translate('select')} ${translate(
                      'looking',
                    )}`}
                    value={relation}
                    // dropStyle={style.flexItem}
                    onSelect={val => {
                      setErrObj({
                        ...errObj,
                        relationErr: false,
                        relationMsg: '',
                      });
                      setrelation(val);
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <View style={style.labelCon}>
                    <Text style={[style.labelTxt]}>
                      {translate('religionLabel')}{' '}
                    </Text>
                    <Text style={style.astrick}>*</Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <DropSelect
                      ErrState={errObj.religionErr}
                      ErrMsg={errObj.religionMsg}
                      itemArray={religionList}
                      placeholder={translate('religionErr')}
                      value={religion}
                      // dropStyle={style.flexItem}
                      onSelect={val => {
                        setErrObj({
                          ...errObj,
                          religionErr: false,
                          religionMsg: '',
                        });
                        setreligion(val);
                      }}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <LabeledInput
                    LabledTextStyle={style.labelTxt}
                    Label={'Bio'}
                    textArea
                    isRequired
                    showError={errObj.bioErr}
                    errorText={errObj.bioMsg}
                    value={bio}
                    onChangeText={txt => {
                      setbio(txt);
                      setErrObj({
                        ...errObj,
                        bioErr: false,
                        bioMsg: '',
                      });
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
          {activePage === 6 && (
            <ScrollView style={style.subContainer}>
              <View>
                <DropSelect
                  Label={translate('country')}
                  placeholder={translate('countryErr')}
                  LabledTextStyle={style.labelTxt}
                  itemArray={countryList}
                  value={country}
                  isRequired
                  onSelect={val => {
                    ProvinceListData(val[0]?.id);
                    setCountry(val);
                    setProvince([]);
                    setLoad(true);
                    setCity([]);
                    setErrObj({
                      ...errObj,
                      countryErr: false,
                      countryMsg: '',
                    });
                  }}
                  ErrState={errObj?.countryErr}
                  ErrMsg={errObj?.countryMsg}
                />
                {load
                  ? ShowLoader()
                  : !isEmpty(provinceList) && (
                      <DropSelect
                        dropStyle={{
                          marginTop: 15,
                        }}
                        Label={translate('province')}
                        placeholder={translate('provinceErr')}
                        LabledTextStyle={style.labelTxt}
                        itemArray={provinceList}
                        value={province}
                        onSelect={val => {
                          CityListData(val[0]?.id);
                          setProvince(val);
                          setLoadCity(true);
                          setCity([]);
                          setErrObj({
                            ...errObj,
                            locationErr: false,
                            locationMsg: '',
                          });
                        }}
                        ErrState={errObj?.locationErr}
                        ErrMsg={errObj?.locationMsg}
                        isSearch
                        isRequired
                      />
                    )}
                {loadCity
                  ? ShowLoader()
                  : !isEmpty(cityList) && (
                      <DropSelect
                        dropStyle={{
                          marginTop: 15,
                        }}
                        Label={translate('city')}
                        placeholder={translate('cityErr')}
                        LabledTextStyle={style.labelTxt}
                        itemArray={cityList}
                        value={city}
                        onSelect={val => {
                          setCity(val);
                          setErrObj({
                            ...errObj,
                            cityErr: false,
                            cityMsg: '',
                          });
                        }}
                        ErrState={errObj?.cityErr}
                        ErrMsg={errObj?.cityMsg}
                        isSearch
                      />
                    )}
              </View>
            </ScrollView>
          )}
          {activePage === 7 && (
            <ScrollView style={style.subContainer}>
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Text
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: 26,
                    color: BaseColors.text,
                  }}
                >
                  {translate('almostthere')}
                </Text>
                <Text style={style.titleText}>{translate('subtext')}</Text>
              </View>
              <View>
                <LabeledInput
                  LabledTextStyle={style.labelTxt}
                  Label={translate('Email')}
                  placeholder={translate('emailplaceholder')}
                  value={email}
                  onChangeText={val => {
                    verifyEmailExist(val);
                    setemail(val);
                    setErrObj({
                      ...errObj,
                      emailErr: false,
                      emailMsg: '',
                    });
                  }}
                  showError={errObj.emailErr}
                  errorText={errObj.emailMsg}
                  isRequired
                />
                <LabeledInput
                  LabledTextStyle={style.labelTxt}
                  Label={translate('confirmEmail')}
                  placeholder={translate('emailplaceholder')}
                  value={cEmail}
                  onChangeText={val => {
                    setcEmail(val);
                    setErrObj({
                      ...errObj,
                      cemailErr: false,
                      cemailMsg: '',
                    });
                  }}
                  showError={errObj.cemailErr}
                  errorText={errObj.cemailMsg}
                  isRequired
                />
                <LabeledInput
                  LabledTextStyle={style.labelTxt}
                  Label={translate('setpassword')}
                  placeholder={translate('passwordplaceholder')}
                  eyePassword
                  value={setPassword}
                  onChangeText={val => {
                    setsetPassword(val);
                    setErrObj({
                      ...errObj,
                      setPassErr: false,
                      setPassMsg: '',
                    });
                  }}
                  showError={errObj.setPassErr}
                  errorText={errObj.setPassMsg}
                  isRequired
                />
                <View style={style.checkCon}>
                  <CheckButton
                    selected={termsVal}
                    onPress={() => {
                      setTermsVal(!termsVal);
                      setErrObj(preVal => {
                        return {
                          ...preVal,
                          termsErr: false,
                        };
                      });
                    }}
                    checkButtonStyle={errObj.termsErr && style.CheckButton}
                  />
                  <Text
                    style={[
                      style.checkText,
                      errObj?.termsErr && style.checkTextErr,
                    ]}
                  >
                    {translate('iAccept')}&nbsp;
                    <Text
                      style={[
                        style.checkTextColor,
                        errObj?.termsErr && style.checkTextErr,
                      ]}
                      onPress={() => navigation.navigate('TermsAgreement')}
                    >
                      {translate('terms&Conditions')}
                    </Text>
                    &nbsp;{translate('and')}&nbsp;
                    <Text
                      style={[
                        style.checkTextColor,
                        errObj?.termsErr && style.checkTextErr,
                      ]}
                      onPress={() => navigation.navigate('PrivacyPolicy')}
                    >
                      {translate('privacyPolicy')}
                    </Text>
                    .
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
          {activePage === 8 && (
            <View style={[style.subContainer]}>
              <View style={style.labelCon}>
                <Text style={[style.labelTxt]}>
                  {translate('uploadprofilepicture')}{' '}
                </Text>
                <Text style={style.astrick}>*</Text>
              </View>
              <View style={[style.Cprofile]}>
                {!_.isEmpty(imageFile) ? (
                  <View>
                    <Image
                      source={{ uri: imageFile?.uri }}
                      style={[style.avatarSty]}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        left: 134,
                        top: -10,
                        backgroundColor: BaseColors.white,
                        borderRadius: 50,
                      }}
                      activeOpacity={BaseSetting.buttonOpacity}
                      onPress={() => {
                        setImageFile({});
                      }}
                    >
                      <CustomIcon
                        name="close"
                        color={BaseColors.primary}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => refPhotoRBSheet.current.open()}
                    activeOpacity={0.8}
                    style={style.camBtnView}
                  >
                    <CustomIcon
                      name="camera"
                      size={20}
                      color={BaseColors.primary}
                    />
                  </TouchableOpacity>
                )}
                <Text style={style.errorTxt}>
                  {errObj.imgErr ? errObj.imgMsg : ''}
                </Text>
              </View>
            </View>
          )}
          {activePage === 9 && (
            <View style={[style.subContainer]}>
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image source={Images.logo} style={style.avatarSty} />
                </View>
                <View
                  style={{ borderWidth: 1, borderColor: BaseColors.primary }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      paddingVertical: 10,
                      backgroundColor: BaseColors.primary,
                    }}
                  >
                    <Text
                      style={{
                        color: BaseColors.white,
                        fontFamily: FontFamily.semiBold,
                        marginTop: 10,
                        letterSpacing: 2,
                      }}
                    >
                      {translate('thanksForSignup')}
                    </Text>
                    <Text
                      style={{
                        color: BaseColors.white,
                        fontFamily: FontFamily.bold,
                        fontSize: 22,
                        marginVertical: 10,
                      }}
                    >
                      {translate('verifyEmailLabel')}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                    }}
                  >
                    <Text style={[style.labelTxt, { textAlign: 'center' }]}>
                      {translate('signupMsg')}{' '}
                    </Text>
                    <Text
                      style={[
                        style.labelTxt,
                        { textAlign: 'center', marginTop: 10 },
                      ]}
                    >
                      {translate('signupMsg1')}
                    </Text>
                  </View>
                  <Button
                    onPress={() => {
                      navigation.reset({
                        routes: [{ name: 'SigninScreen' }],
                      });
                    }}
                    title={translate('Signin')}
                    style={{ marginHorizontal: 50, marginBottom: 10 }}
                  />
                </View>
              </View>
            </View>
          )}
          {activePage === 10 && (
            <View style={[style.subContainer, { justifyContent: 'center' }]}>
              <View>
                <Animatable.Image
                  duration={2000}
                  animation={'fadeIn'}
                  source={Images.profile}
                  resizeMode="contain"
                />
                <Animatable.View
                  duration={2000}
                  animation={'fadeIn'}
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={style.mainheading}>{translate('your')} </Text>
                  <Text
                    style={[style.mainheading, { color: BaseColors.primary }]}
                  >
                    {translate('profile')}{' '}
                  </Text>
                  <Text style={style.mainheading}>{translate('isSet')}</Text>
                </Animatable.View>
              </View>
            </View>
          )}
          {activePage < 9 && (
            <View>
              <Button
                title={translate('continue')}
                style={style.continueBtn}
                onPress={() => {
                  Validation();
                }}
                loading={btnLoader}
              />
            </View>
          )}
          {activePage === 10 && (
            <View>
              <Button
                title={translate(`LET'S GO`)}
                style={style.continueBtn}
                loading={btnLoader}
                onPress={() => {
                  navigation.reset({
                    routes: [{ name: 'SigninScreen' }],
                  });
                }}
              />
            </View>
          )}
        </View>
      )}
      <RenderSelectOptionsModal
        refRBSheet={refPhotoRBSheet}
        title={translate('Uploadimages')}
        optionsArray={optionsArray}
      />
    </>
  );
};

export default SignUp;
