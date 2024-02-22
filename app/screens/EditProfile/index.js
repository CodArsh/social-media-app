import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import LabeledInput from '@components/LabeledInput';
import DropSelect from '@components/DropSelect';
import Picker from '@components/DatePicker';
import Button from '@components/Button';
import { isEmpty, isNull } from 'lodash';
import HeaderBar from '@components/HeaderBar';
import moment from 'moment';
import BaseSetting from '@config/setting';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import Loader from '@components/Loader/Loader';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import translate from '../../lang/lang/Translate';
import CModal from '@components/CModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { BaseColors } from '@config/theme';
import ImagePicker from '../../lib/react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import VideoPlayer from 'react-native-video-player';

const EditProfile = ({ navigation }) => {
  const IOS = Platform.OS === 'ios';
  const { setUserData, setEmptyProfile, setRememberData } = Authentication;
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const errorObj = {
    PhotoErr: false,
    PhotoErrMsg: '',
    NameErr: false,
    NameErrMsg: '',
    NickNameErr: false,
    NickNameErrMsg: '',
    sexErr: false,
    sexErrMsg: '',
    BirthErr: false,
    BirthErrMsg: '',
    BioErr: false,
    BioErrMsg: '',
    CityErr: false,
    CityErrMsg: '',
    ProvinceErr: false,
    ProvinceErrMsg: '',
    CountryErr: false,
    CountryErrMsg: '',
    orientErr: false,
    orientErrMsg: '',
  };
  const { userData, emptyProfile } = useSelector(state => {
    return state.auth;
  });
  const { languageData } = useSelector(state => state.language);
  const [user, setUser] = useState(userData);
  const [ErrObj, setErrObj] = useState(errorObj);
  const [NameVal, setNameVal] = useState('');
  const [NickNameVal, setNickNameVal] = useState('');
  const [GenderVal, setGenderVal] = useState([]);
  const [BirthVal, setBirthVal] = useState('');
  const [BioVal, setBioVal] = useState('');
  const [rememberID, setRememberId] = useState();
  const [ProfilePhoto, setProfilePhoto] = useState('');
  const [ProfileVideo, setProfileVideo] = useState('');
  const [CountryVal, setCountryVal] = useState([]);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [PageLoader, setPageLoader] = useState(false);
  const [VideoLoader, setVideoLoader] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const [pickerSize, setPickerSize] = useState(false);
  const [CountryList, setCountryList] = useState([]);
  const [genderList, setGenderList] = useState([]);
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
  // Gender list
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
  const [modal, setModal] = useState({
    open: false,
    content: '',
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [orientionList, setOrientationList] = useState([]);
  const [orient, setOrient] = useState([]);
  useEffect(() => {
    getOriention();
  }, []);
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

  const handleScroll = event => {
    if (event) {
      const slide = Math.ceil(
        event.contentOffset.x / event.layoutMeasurement.width,
      );
      setScrollPosition(slide);
    }
  };

  const iconSize = 22;
  const iconColor = BaseColors.secondary;
  const UploadSelectArr = [
    {
      id: '1',
      icon: <Icon name="photo" size={iconSize} color={iconColor} />,
      rightIcon: (
        <Icon2 name="chevron-thin-right" size={iconSize} color={iconColor} />
      ),
      title: translate('SelectfromGallery'),
      onPress: () => {
        openGallery();
      },
    },
    {
      id: '2',
      icon: <Icon name="camera" size={iconSize} color={iconColor} />,
      rightIcon: (
        <Icon2 name="chevron-thin-right" size={iconSize} color={iconColor} />
      ),
      title: translate('OpenCamera'),
      onPress: () => {
        openCamera();
      },
    },
  ];
  const resolution = 1500;

  const handlePickerPhoto = () => {
    if (modal.content === 'video') {
      ImagePicker?.openCamera({
        mediaType: 'video',
      }).then(video => {
        // console.log(
        //   '📌 ⏩ file: index.js:151 ⏩ openCamera ⏩ video:',
        //   video,
        // );

        setModal({
          open: false,
          content: '',
        });
        if (video?.size > 50000000) {
          Toast.show({
            type: 'error',
            text1: translate('videonotexceed'),
          });
        } else {
          const videoFile = {
            uri: video?.path,
            name: video?.path.substr(video?.path.lastIndexOf('/') + 1),
            type: video.mime,
          };

          setProfileVideo(videoFile);
        }
      });
    } else {
      ImagePicker?.openCamera({
        width: resolution,
        height: resolution,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        // console.log(
        //   '📌 ⏩ file: index.js:157 ⏩ openCamera ⏩ image:',
        //   image,
        // );
        setModal({
          open: false,
          content: '',
        });
        if (image?.size > 10000000) {
          Toast.show({
            type: 'error',
            text1: ' The image size should not exceed 10mb.',
          });
        } else {
          const imgFile = {
            uri: image?.path,
            name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
            type: image.mime,
          };

          setErrObj(preVal => {
            return {
              ...preVal,
              PhotoErr: false,
              PhotoErrMsg: '',
            };
          });

          setProfilePhoto(imgFile);
        }
      });
    }
  };

  const openCamera = async () => {
    if (IOS) {
      handlePickerPhoto();
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
          handlePickerPhoto();
        } else {
          Toast.show({
            text1: 'Camera permission denied',
            type: 'error',
          });
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn('err====>>>', err);
      }
    }
  };

  const openGallery = () => {
    modal.content === 'video'
      ? ImagePicker?.openPicker({
          mediaType: 'video',
        }).then(video => {
          // console.log(
          //   '📌 ⏩ file: index.js:216 ⏩ openGallery ⏩ video:',
          //   video,
          // );

          setModal({
            open: false,
            content: '',
          });

          if (video?.size > 50000000) {
            Toast.show({
              type: 'error',
              text1: translate('videonotexceed'),
            });
          } else {
            const videoFile = {
              uri: video?.path,
              name: video?.path.substr(video?.path.lastIndexOf('/') + 1),
              type: video.mime,
            };

            setProfileVideo(videoFile);
          }
        })
      : ImagePicker?.openPicker({
          width: resolution,
          height: resolution,
          cropping: true,
          cropperCircleOverlay: true,
        }).then(image => {
          // console.log(
          //   '📌 ⏩ file: index.js:114 ⏩ openGallery ⏩ image:',
          //   image,
          // );

          setModal({
            open: false,
            content: '',
          });
          if (image?.size > 10000000) {
            Toast.show({
              type: 'error',
              text1: ' The image size should not exceed 10mb.',
            });
          } else {
            const imgFile = {
              uri: image?.path,
              name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
              type: image.mime,
            };
            setErrObj(preVal => {
              return {
                ...preVal,
                PhotoErr: false,
                PhotoErrMsg: '',
              };
            });
            setProfilePhoto(imgFile);
          }
        });
  };

  const DefaultData = async () => {
    setPageLoader(true);
    const endPoint = BaseSetting.endpoints.basicInfoView;

    try {
      const resp = await getApiData(endPoint, 'GET');
      if (resp?.status) {
        setRememberId(resp?.data?.id);
        setNameVal(resp?.data?.name);
        setNickNameVal(resp?.data?.nick_name);
        setGenderVal(resp?.data?.gender || []);
        setBirthVal(resp?.data?.birth_date);
        setBioVal(resp?.data?.bio);
        setCityVal(resp?.data?.city ? [resp?.data?.city] : []);
        setProvinceVal(resp?.data?.province ? [resp?.data?.province] : []);
        setCountryVal(resp?.data?.country ? [resp?.data?.country] : []);
        setProfilePhoto({ uri: resp?.data?.profile_photo });
        setProfileVideo({ uri: resp?.data?.profile_video });
        setOrient(resp?.data?.sexual_orientation || []);
        setCountryId(resp?.data?.country.id);
        setProvinceId(resp?.data?.province?.id);
        setUser(preVal => {
          return {
            ...preVal,
            name: resp?.data?.name,
            nick_name: resp?.data?.nick_name,
            profile_photo: resp?.data?.profile_photo,
          };
        });
      } else {
        console.log('response error');
      }
      setPageLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:75 ⏩ DefaultData ⏩ error:', error);
      setPageLoader(false);
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

  useEffect(() => {
    DefaultData();
    CountryListAPI();
    genderListAPI();

    return () => {
      null;
    };
  }, []);

  useEffect(() => {
    dispatch(setUserData(user));
    return () => {
      null;
    };
  }, [user]);

  const HandelUpdateBtn = () => {
    const Error = { ...ErrObj };
    let Valid = true;
    /* =============================== PROFILE PHOTO VALIDATION =============================== */
    if (isEmpty(ProfilePhoto.uri) || isNull(ProfilePhoto.uri)) {
      Valid = false;
      Error.PhotoErr = true;
      Error.PhotoErrMsg = translate('requiredfield');
    }
    /* =============================== NAME VALIDATION =============================== */
    if (isEmpty(NameVal.trim()) || isNull(NameVal)) {
      Valid = false;
      Error.NameErr = true;
      Error.NameErrMsg = translate('requiredfield');
    }

    /* ===============================  NICK NAME VALIDATION =============================== */
    if (isEmpty(NickNameVal.trim()) || isNull(NickNameVal)) {
      Valid = false;
      Error.NickNameErr = true;
      Error.NickNameErrMsg = translate('requiredfield');
    }

    /* ===============================  SEX VALIDATION =============================== */
    if (isEmpty(GenderVal) || isNull(GenderVal)) {
      Valid = false;
      Error.sexErr = true;
      Error.sexErrMsg = translate('requiredfield');
    }

    /* ===============================  BIRTH DATE VALIDATION =============================== */
    if (isEmpty(BirthVal) || isNull(BirthVal)) {
      Valid = false;
      Error.BirthErr = true;
      Error.BirthErrMsg = translate('requiredfield');
    }

    /* ===============================  BIO VALIDATION =============================== */
    if (isEmpty(BioVal.trim()) || isNull(BioVal)) {
      Valid = false;
      Error.BioErr = true;
      Error.BioErrMsg = translate('requiredfield');
    }
    /* ===============================  PROVINCE VALIDATION =============================== */
    if (isEmpty(ProvinceVal) || isNull(ProvinceVal)) {
      Valid = false;
      Error.ProvinceErr = true;
      Error.ProvinceErrMsg = translate('requiredfield');
    }
    /* ===============================  COUNTRY VALIDATION =============================== */
    if (isEmpty(CountryVal) || isNull(CountryVal)) {
      Valid = false;
      Error.CountryErr = true;
      Error.CountryErrMsg = translate('requiredfield');
    }
    // orientation
    if (isEmpty(orient) || isNull(orient)) {
      Valid = false;
      Error.orientErr = true;
      Error.orientErrMsg = translate('requiredfield');
    }

    setErrObj(Error);

    if (Valid) {
      UpdateData();
    } else {
      Toast.show({
        type: 'error',
        text1: translate('fillOutRequired'),
      });
    }
  };

  const CheckEmptyProfile = () => {
    if (emptyProfile?.character) {
      navigation.replace('Characteristic');
    } else if (emptyProfile?.interest) {
      navigation.replace('Interest');
    } else if (emptyProfile?.preference) {
      navigation.replace('Preferences');
    } else {
      navigation.replace('Home');
    }
  };

  const UpdateData = async () => {
    setBtnLoader(true);
    const endPoint = BaseSetting.endpoints.basicInfoUpdate;
    const updated_orient = orient.map(item => item?.id?.toString());
    const params = {
      'UserBasicInfo[name]': NameVal,
      'UserBasicInfo[nick_name]': NickNameVal,
      'UserBasicInfo[gender]': GenderVal[0]?.id?.toString(),
      'UserBasicInfo[birth_date]': BirthVal,
      'UserBasicInfo[bio]': BioVal,
      'UserBasicInfo[city]': CityVal[0]?.id.toString(),
      'UserBasicInfo[province]': ProvinceVal[0]?.id.toString(),
      'UserBasicInfo[country]': CountryVal[0]?.id.toString(),
    };

    if (ProfilePhoto?.type) {
      params['UserBasicInfo[profile_photo]'] = ProfilePhoto;
    }
    if (ProfileVideo?.type) {
      params['UserBasicInfo[profile_video]'] = ProfileVideo;
    }
    updated_orient?.map((item, index) => {
      return (params[`UserBasicInfo[sexual_orientation][${index}]`] = item);
    });
    try {
      const res = await getApiDataProgress(endPoint, 'POST', params);
      if (res?.status) {
        dispatch(
          setRememberData({
            uname: NameVal,
            id: rememberID,
            photo: ProfilePhoto?.uri,
          }),
        );
        Toast.show({
          text1: res?.message,
          type: 'success',
        });
        setUser(preVal => {
          return {
            ...preVal,
            name: NameVal,
            nick_name: NickNameVal,
            profile_photo: ProfilePhoto?.uri,
          };
        });
        if (emptyProfile?.profile) {
          dispatch(
            setEmptyProfile({
              profile: false,
              character: emptyProfile?.character,
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
          text1: res?.message,
          type: 'error',
        });
      }
      setBtnLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:160 ⏩ UpdateData ⏩ error:', error);
      setBtnLoader(false);
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
      <HeaderBar HeaderText={translate('editProfile')} />
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
            contentContainerStyle={styles.ScrollView}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
            >
              {/* =============================== PROFILE PHOTO FIELD =============================== */}
              <View style={{ width: BaseSetting.nWidth - 40 }}>
                {ProfilePhoto?.uri ? (
                  <View
                    activeOpacity={BaseSetting.buttonOpacity}
                    style={styles.pofileCon}
                  >
                    {imgLoader && (
                      <View style={styles.imgLoader}>
                        <Loader small />
                      </View>
                    )}
                    <Image
                      source={{ uri: ProfilePhoto?.uri }}
                      style={styles.Img}
                      resizeMode="cover"
                      onLoadStart={() => setImgLoader(true)}
                      onLoadEnd={() => setImgLoader(false)}
                    />
                    <TouchableOpacity
                      activeOpacity={BaseSetting.buttonOpacity}
                      style={styles.EditIcon}
                      onPress={() => setModal({ open: true, content: 'image' })}
                    >
                      <Icon3 name="edit" size={15} color={BaseColors.white} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={BaseSetting.buttonOpacity}
                    style={styles.noData}
                    onPress={() => setModal({ open: true, content: 'image' })}
                  >
                    <Icon2 name="camera" size={40} color={BaseColors.primary} />
                  </TouchableOpacity>
                )}
                {ErrObj.PhotoErr && (
                  <View style={styles.errBox}>
                    <Text style={styles.errText} numberOfLines={2}>
                      {ErrObj.PhotoErrMsg}
                    </Text>
                  </View>
                )}
              </View>

              {/* =============================== PROFILE VIDEO FIELD =============================== */}
              {ProfileVideo?.uri ? (
                <View style={styles.vidoeCon}>
                  {VideoLoader && <Loader small style={styles.VideoLoader} />}
                  <VideoPlayer
                    video={{ uri: ProfileVideo?.uri }}
                    disableFullscreen
                    maxBitRate={2000000} // 2 megabits
                    rate={1}
                    showDuration
                    onLoadStart={() => setVideoLoader(true)}
                    onLoad={() => setVideoLoader(false)}
                    disableSeek
                  />
                  <TouchableOpacity
                    activeOpacity={BaseSetting.buttonOpacity}
                    style={styles.EditIcon}
                    onPress={() => setModal({ open: true, content: 'video' })}
                  >
                    <Icon3 name="edit" size={15} color={BaseColors.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={styles.noData}
                  onPress={() => setModal({ open: true, content: 'video' })}
                >
                  <Icon2
                    name="video-camera"
                    size={40}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={styles.pageView}>
              <View
                style={[
                  styles.pageDot,
                  scrollPosition === 0 && styles.pageDotActive,
                ]}
              />
              <View
                style={[
                  styles.pageDot,
                  scrollPosition === 1 && styles.pageDotActive,
                ]}
              />
            </View>
            {/* =============================== NAME FIELD =============================== */}
            <LabeledInput
              Label={translate('name')}
              isRequired
              placeholder={translate('EnterName')}
              LabledInputStyle={styles.MarginVer}
              showError={ErrObj.NameErr}
              errorText={ErrObj.NameErrMsg}
              value={NameVal}
              onChangeText={val => {
                setNameVal(val);
                setErrObj(oldVal => {
                  return {
                    ...oldVal,
                    NameErr: false,
                    NameErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== NICK NAME FIELD =============================== */}
            <LabeledInput
              Label={translate('nickName')}
              isRequired
              placeholder={translate('EnterNickname')}
              LabledInputStyle={styles.MarginVer}
              showError={ErrObj.NickNameErr}
              errorText={ErrObj.NickNameErrMsg}
              value={NickNameVal}
              onChangeText={val => {
                setNickNameVal(val);
                setErrObj(oldVal => {
                  return {
                    ...oldVal,
                    NickNameErr: false,
                    NickNameErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== GENDER FIELD =============================== */}

            <DropSelect
              Label={translate('Gender')}
              itemArray={genderList}
              dropStyle={styles.marginVer}
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
            {/* Sexual Orientation  */}
            <View style={{ marginVertical: 15 }}>
              <DropSelect
                isRequired
                Label={translate('sexualOrientation')}
                placeholder={translate('SelectSexualOrientation')}
                itemArray={orientionList}
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
            </View>
            {/* =============================== BIRTH DATE FIELD =============================== */}
            <View style={[styles.labelField, styles.MarginVer]}>
              <View style={styles.labelCon}>
                <Text style={[styles.labelTxt]}>
                  {translate('dateOfBirth')}
                </Text>
                <Text style={styles.astrick}>*</Text>
              </View>
              <Picker
                defaultValue={BirthVal}
                onDateSelect={val => {
                  setBirthVal(moment(val).format('YYYY-MM-DD'));
                  setErrObj(preVal => {
                    return {
                      ...preVal,
                      BirthErr: false,
                      BirthErrMsg: '',
                    };
                  });
                }}
                containerStyle={
                  pickerSize && IOS && { height: BaseSetting.nHeight * 0.25 }
                }
                onPress={() => IOS && setPickerSize(true)}
                onClose={() => IOS && setPickerSize(false)}
              />
              {ErrObj.BirthErr && (
                <View style={styles.errBox}>
                  <Text style={styles.errText} numberOfLines={2}>
                    {ErrObj.BirthErrMsg}
                  </Text>
                </View>
              )}
            </View>

            {/* =============================== BIO FIELD =============================== */}
            <LabeledInput
              Label={translate('bio')}
              isRequired
              textArea
              LabledInputStyle={styles.MarginVer}
              showError={ErrObj.BioErr}
              errorText={ErrObj.BioErrMsg}
              value={BioVal}
              onChangeText={val => {
                setBioVal(val);
                setErrObj(oldVal => {
                  return {
                    ...oldVal,
                    BioErr: false,
                    BioErrMsg: '',
                  };
                });
              }}
            />

            {/* =============================== COUNTRY FIELD =============================== */}

            <DropSelect
              Label={translate('country')}
              itemArray={CountryList}
              isRequired
              placeholder={translate('SelectCountry')}
              value={CountryVal}
              dropStyle={styles.MarginVer}
              ErrState={ErrObj.CountryErr}
              ErrMsg={ErrObj.CountryErrMsg}
              onSelect={val => {
                ProvinceListData(val[0]?.id);
                setCountryId(val[0]?.id);
                setCountryVal(val);
                setProvinceVal([]);
                setLoad(true);
                setCityVal([]);
                setErrObj(preVal => {
                  return {
                    ...preVal,
                    CountryErr: false,
                    CountryErrMsg: '',
                  };
                });
              }}
              onPress={() =>
                !IOS && scrollViewRef.current.scrollToEnd({ animated: true })
              }
            />
            {/* =============================== PROVINCE FIELD =============================== */}
            {load
              ? ShowLoader()
              : !isEmpty(provinceList) && (
                  <DropSelect
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
                      setLoadCity(true);
                      setCityVal([]);
                      setErrObj(oldVal => {
                        return {
                          ...oldVal,
                          ProvinceErr: false,
                          ProvinceErrMsg: '',
                        };
                      });
                    }}
                    isSearch
                    isRequired
                    onPress={() =>
                      !IOS &&
                      scrollViewRef.current.scrollToEnd({ animated: true })
                    }
                  />
                )}

            {/* =============================== CITY FIELD =============================== */}
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
                    onPress={() =>
                      !IOS &&
                      scrollViewRef.current.scrollToEnd({ animated: true })
                    }
                  />
                )}
          </ScrollView>
          {/* =============================== BUTTON FIELD =============================== */}

          <Button
            title={translate('updateProfile')}
            style={styles.Button}
            loading={BtnLoader}
            onPress={HandelUpdateBtn}
          />
        </KeyboardAvoidingView>
      )}
      <CModal
        visible={modal?.open}
        modalType="bottom"
        modalStyle={styles.modal}
        onRequestClose={() => setModal({ open: false, content: '' })}
        onPressOverlay={() => setModal({ open: false, content: '' })}
      >
        <View style={styles.headLine} />
        <Text style={styles.modalTitle}>
          {modal.content === 'video'
            ? translate('UploadVideo')
            : translate('UploadImage')}
        </Text>
        {UploadSelectArr.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.uploadSelect}
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={item?.onPress}
            >
              {item?.icon}
              <Text style={styles.SelectText}>{item?.title}</Text>
              {item?.rightIcon}
            </TouchableOpacity>
          );
        })}
      </CModal>
    </View>
  );
};

export default EditProfile;
