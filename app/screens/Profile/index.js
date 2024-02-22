import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import style from './style';
import Lottie from 'lottie-react-native';
import { Images } from '@config';
import { logout } from '@utils/CommonFunction';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { getApiData, getApiDataProgress } from '@utils/apiHelper';
import { isArray, isEmpty, isNull } from 'lodash';
import SChip from '@components/SChip';
import Loader from '@components/Loader/Loader';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CModal from '@components/CModal';
import Button from '@components/Button';
import GradientBox from '@components/GradientBox';
import translate from '../../lang/lang/Translate';
import ImagePicker from '../../lib/react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { CustomIcon } from '@config/LoadIcons';
import VideoPlayer from 'react-native-video-player';
import InfoCard from '@components/InfoCard';
import socket from '@utils/socket';

const Profile = ({ navigation, route }) => {
  const IOS = Platform.OS === 'ios';
  const height = useRef(new Animated.Value(0)).current;
  const heightIn = useRef(new Animated.Value(0)).current;
  const [finish, setFinish] = useState(false);
  const [finishInterests, setFinishInterests] = useState(false);
  const [visibleDel, setVisibleDel] = useState(false);
  const openChar = () => {
    closeInterests();
    Animated.timing(height, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFinish(true);
    });
  };

  const closeChar = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFinish(false);
    });
  };
  const openInterests = () => {
    closeChar();
    Animated.timing(heightIn, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFinishInterests(true);
    });
  };

  const closeInterests = () => {
    Animated.timing(heightIn, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFinishInterests(false);
    });
  };
  const from = route?.params?.from;
  const userId = route?.params?.id;
  const [PageLoader, setPageLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const [VideoLoader, setVideoLoader] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const [BtnLoaderwink, setBtnLoaderwink] = useState(false);
  const [BtnLoaderheart, setBtnLoaderheart] = useState(false);
  const [userName, setuserName] = useState();
  const [userPic, setuserPic] = useState();
  const [location, setLocation] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [religion, setReligion] = useState([]);
  const [relation, setRelation] = useState();
  const [bio, setBio] = useState();
  const [hobby, setHobby] = useState();
  const [limit, setLimit] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [block, setBlock] = useState(false);
  const [visible, setVisible] = useState(false);
  const [blockId, setBlockId] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [match, setMatch] = useState();
  const [addFav, setAddFav] = useState('heart-outline');
  const [modal, setModal] = useState(false);
  const [eyes, setEyes] = useState('');
  const [hair, setHair] = useState('');
  const [personality, setPersonality] = useState('');
  const [smoker, setSmoker] = useState('');
  const [actor, setActor] = useState('');
  const [actress, setActress] = useState('');
  const [holiday, setHoliday] = useState('');
  const [music, setMusic] = useState('');
  const [movie, setMovie] = useState('');
  const [love, setLove] = useState('');
  const [cloth, setCloth] = useState('');
  const [ErrObj, setErrObj] = useState(errorObj);
  const { setVideo, setUserPhotos } = Authentication;
  const [chatData, setChatData] = useState();
  const [conversation, setConversation] = useState();
  const dispatch = useDispatch();
  const [userBlock, setUserBlock] = useState();
  const [drinker, setDrinker] = useState('');
  const [food, setFood] = useState('');
  const [car, setCar] = useState('');
  const [hate, setHate] = useState('');
  const [artist, setArtist] = useState('');
  const [is_activate, set_isActivate] = useState();
  const [activatePopup, setActivatePopup] = useState(false);
  const [deactivatePopup, setDeactivatePopup] = useState(false);
  const [pic, setPic] = useState(false);
  const {
    video,
    isSubscribed,
    accessToken,
    userPhotos,
    userData,
    isConnected,
  } = useSelector(state => {
    return state.auth;
  });
  // check user visit
  useEffect(() => {
    from === 'user' &&
      setTimeout(() => {
        getVisit();
      }, 1000);
  }, []);
  const errorObj = {
    PhotoErr: false,
    PhotoErrMsg: '',
  };

  const getVisit = async () => {
    const endPoint = `${BaseSetting.endpoints.visitors}?user_id=${userId}`;
    try {
      await getApiData(endPoint, 'GET');
    } catch (error) {
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // character data
  const character = [
    {
      id: 1,
      title: translate('eyeColor'),
      name: eyes,
    },
    {
      id: 2,
      title: translate('Haircolor'),
      name: hair,
    },
    {
      id: 3,
      title: translate('Personality'),
      name: personality,
    },
    {
      id: 4,
      title: translate('Smoker'),
      name: smoker,
    },
    {
      id: 5,
      title: translate('Clothingstyle'),
      name: cloth,
    },
    {
      id: 6,
      title: translate('Drinker'),
      name: drinker,
    },
  ];

  // interests data
  const interests = [
    {
      id: 1,
      title: translate('FavoriteActor'),
      name: actor,
    },
    {
      id: 2,
      title: translate('FavoriteActress'),
      name: actress,
    },
    {
      id: 3,
      title: translate('HolidayDestination'),
      name: holiday,
    },
    {
      id: 4,
      title: translate('MusicGenre'),
      name: music,
    },
    {
      id: 5,
      title: translate('MovieGenre'),
      name: movie,
    },
    {
      id: 6,
      title: translate('ILove'),
      name: love,
    },
    {
      id: 7,
      title: translate('favoriteFood'),
      name: food,
    },
    {
      id: 8,
      title: translate('favoriteCar'),
      name: car,
    },
    {
      id: 9,
      title: translate('iHate'),
      name: hate,
    },
    {
      id: 10,
      title: translate('FavoriteArtist'),
      name: artist,
    },
  ];

  // add wink
  const addWink = async () => {
    setBtnLoaderwink(true);
    const endPoint = `${BaseSetting.endpoints.wink}?user_id=${userId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      }
      setBtnLoaderwink(false);
    } catch (error) {
      setBtnLoaderwink(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  function togglePopup() {
    setIsPopupVisible(!isPopupVisible);
  }
  const iconSize = 22;
  const iconColor = BaseColors.secondary;
  const UploadSelectArr = [
    {
      id: '1',
      icon: <Icon1 name="photo" size={iconSize} color={iconColor} />,
      rightIcon: (
        <Icon4 name="chevron-thin-right" size={iconSize} color={iconColor} />
      ),
      title: translate('SelectfromGallery'),
      onPress: () => {
        openGallery();
      },
    },
    {
      id: '2',
      icon: <Icon1 name="camera" size={iconSize} color={iconColor} />,
      rightIcon: (
        <Icon4 name="chevron-thin-right" size={iconSize} color={iconColor} />
      ),
      title: translate('OpenCamera'),
      onPress: () => {
        openCamera();
      },
    },
  ];
  const pictureAdd = async imgObj => {
    setPageLoader(true);
    const endPoint = BaseSetting.endpoints.addPicture;
    const params = {};
    params['UserPhotos[photo]'] = imgObj;
    try {
      const resp = await getApiDataProgress(endPoint, 'POST', params);
      getuserDetails();
      if (resp?.status) {
        setPageLoader(false);
        Toast.show({
          text1: resp?.message,
          type: 'success',
        });
      } else {
        setPageLoader(false);
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
    } catch (error) {
      setPageLoader(false);
      Toast.show({
        text1: error,
        type: 'error',
      });
    }
  };
  const openCamera = async () => {
    if (IOS) {
      ImagePicker?.openCamera({
        width: 1500,
        height: 1500,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        // console.log(
        //   '📌 ⏩ file: index.js:157 ⏩ openCamera ⏩ image:',
        //   image,
        // );
        setModal(false);
        setIsPopupVisible(false);

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
        pictureAdd(imgFile);
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Dottie Camera Permission',
            message:
              'Dottie needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker?.openCamera({
            width: 1500,
            height: 1500,
            cropping: true,
            cropperCircleOverlay: true,
          }).then(image => {
            // console.log(
            //   '📌 ⏩ file: index.js:157 ⏩ openCamera ⏩ image:',
            //   image,
            // );
            setModal(false);
            setIsPopupVisible(false);

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
            pictureAdd(imgFile);
          });
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
    ImagePicker?.openPicker({
      width: 1500,
      height: 1500,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      // console.log('📌 ⏩ file: index.js:114 ⏩ openGallery ⏩ image:', image);

      setModal(false);
      setIsPopupVisible(false);

      const imgFile = {
        uri: image?.path,
        name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
        type: image.mime,
      };
      pictureAdd(imgFile);

      setErrObj(preVal => {
        return {
          ...preVal,
          PhotoErr: false,
          PhotoErrMsg: '',
        };
      });
      // setProfilePhoto(imgFile);
    });
  };
  const basicDetails = [
    {
      id: 1,
      name: location,
      icon: <Icon3 name="location" color={BaseColors.primary} size={35} />,
    },
    {
      id: 2,
      name: gender,
      icon: (
        <Icon1 name="transgender-alt" color={BaseColors.primary} size={30} />
      ),
    },
    {
      id: 3,
      name: religion,
      icon: <Icon2 name="earth" color={BaseColors.primary} size={20} />,
    },
    {
      id: 4,
      name: relation,
      icon: <Icon1 name="handshake-o" color={BaseColors.primary} size={20} />,
    },
  ];
  useEffect(() => {
    getuserDetails();
  }, []);

  useEffect(() => {
    setAddFav(favorite ? 'heart' : 'heart-outline');
  }, [favorite]);
  const [proId, setProId] = useState();
  // get User details
  const getuserDetails = async () => {
    setPageLoader(true);
    const endPoint = `${BaseSetting.endpoints.userDetails}?user_id=${userId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setProId(res?.data?.basic_info?.id);
        set_isActivate(res?.data?.basic_info?.is_active);
        dispatch(setUserPhotos(res?.data?.photos));
        dispatch(setVideo(res?.data?.basic_info?.profile_video));
        setPic(false);

        setChatData(res?.data?.chat_data);
        setConversation(res?.data?.conversation);
        setBlock(res?.data?.basic_info?.is_blocked);
        setFavorite(res?.data?.basic_info?.is_favourite);
        setMatch(res?.data?.basic_info?.is_matched);

        setuserName(res?.data?.basic_info?.name);
        setuserPic(res?.data?.basic_info?.profile_photo);
        setEyes(
          res?.data?.character?.eyes[0]?.name
            ? res?.data?.character?.eyes[0]?.name
            : '-',
        );
        setHair(
          res?.data?.character?.hair[0]?.name
            ? res?.data?.character?.hair[0]?.name
            : '-',
        );
        setPersonality(
          res?.data?.character?.personality[0]?.name
            ? res?.data?.character?.personality[0]?.name
            : '-',
        );
        setSmoker(
          res?.data?.character?.smoker[0]?.name
            ? res?.data?.character?.smoker[0]?.name
            : '-',
        );
        setLocation(res?.data?.basic_info?.location);
        setAge(res?.data?.basic_info?.age);
        setGender(res?.data?.basic_info?.gender[0]?.name);
        setReligion(res?.data?.character?.religion[0]?.name);
        setRelation(res?.data?.character?.relationship[0]?.name);
        setFood(res?.data?.interest?.food);
        setCar(res?.data?.interest?.car);
        setHate(res?.data?.interest?.hate);
        setArtist(res?.data?.interest?.artist);
        setDrinker(res?.data?.character?.drinker[0]?.name);
        setBio(res?.data?.basic_info?.bio);
        setHobby(res?.data?.hobbies);
        setLimit(res?.data?.limitations);
        setActor(res?.data?.interest?.actor ? res?.data?.interest?.actor : '-');
        setActress(
          res?.data?.interest?.actress ? res?.data?.interest?.actress : '-',
        );
        setHoliday(
          res?.data?.interest?.holiday_destination
            ? res?.data?.interest?.holiday_destination
            : '-',
        );
        setMusic(
          res?.data?.interest?.music_genre[0]?.name
            ? res?.data?.interest?.music_genre[0]?.name
            : '-',
        );
        setMovie(
          res?.data?.interest?.movie_genre[0]?.name
            ? res?.data?.interest?.movie_genre[0]?.name
            : '-',
        );

        setLove(res?.data?.interest?.love ? res?.data?.interest?.love : '-');
        setCloth(
          res?.data?.character?.clothing_style
            ? res?.data?.character?.clothing_style
            : '-',
        );
      } else {
        setUserBlock(true);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };

  // block user
  const getBlock = id => {
    return setVisible(true), setBlockId(userId), togglePopup();
  };
  const blockUser = async Uid => {
    setBtnLoader(true);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.blockUser}?blocked_user_id=${Uid}`,
        'GET',
      );
      if (res?.status) {
        setBlock(!block);
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
      setVisible(false);
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:89 ⏩ RemoveFavourite ⏩ error:',
        error,
      );
      setBtnLoader(false);
      setVisible(false);
    }
  };

  // favourite user
  const favouriteUser = async Uid => {
    setBtnLoader(true);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.favourite}?fav_user_id=${Uid}`,
        'GET',
      );
      if (res?.status) {
        setFavorite(!favorite);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
      setVisible(false);
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:89 ⏩ RemoveFavourite ⏩ error:',
        error,
      );
      setBtnLoader(false);
      setVisible(false);
    }
  };

  // delete api
  const HandelDelete = () => {
    deleteAccount();
  };

  async function deleteAccount() {
    setBtnLoader(true);

    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.deleteAccount}`,
        'GET',
      );
      if (response.status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        logout();
        setBtnLoader(false);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong! Please try again',
        });
        setBtnLoader(false);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:287 ⏩ deleteAccount ⏩ error:', error);
      setBtnLoader(false);
    }
  }

  // handle deactivate
  async function handleDeactivate() {
    setBtnLoader(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.deactivate}`,
        'GET',
      );
      if (response.status) {
        set_isActivate(!is_activate);
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        setBtnLoader(false);
        setActivatePopup(false);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong! Please try again',
        });
        setActivatePopup(false);
        setBtnLoader(false);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:287 ⏩ deleteAccount ⏩ error:', error);
      setBtnLoader(false);
      setActivatePopup(false);
    }
  }

  //handle reactivate
  async function handleReactivate() {
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.reactivate}`,
        'GET',
      );
      if (response.status) {
        set_isActivate(!is_activate);
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        setDeactivatePopup(false);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong! Please try again',
        });
        setDeactivatePopup(false);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:287 ⏩ deleteAccount ⏩ error:', error);
      setDeactivatePopup(false);
    }
  }
  const modalChildren = () => {
    return (
      <View style={style.deleteImg}>
        <Text style={style.topTitle}>{translate('AreYouSure')}</Text>
        <Text style={style.desc}>{translate('cBlock')}?</Text>
        <View style={style.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() => setVisible(false)}
              type="outlined"
              title={translate('cancel')}
              style={style.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              onPress={() => blockUser(blockId)}
              loading={BtnLoader}
              title={translate('block')}
              style={style.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // send user request
  const sendUserRequest = async uId => {
    setBtnLoaderheart(true);
    const endPoint = `${BaseSetting.endpoints.sendRequest}?user_id=${uId}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      }
      setBtnLoaderheart(false);
    } catch (error) {
      setBtnLoaderheart(false);
      console.log('📌 ⏩ file: index.js:50 ⏩ HobbiesApi ⏩ error:', error);
    }
  };
  const commonSize = 25;
  const topChild = () => {
    return (
      <View style={style.backHome}>
        <TouchableOpacity
          activeOpacity={BaseSetting.buttonOpacity}
          style={style.imageCon}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={Images.BackArrowWhite}
            style={style.Img}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={togglePopup}>
            <Icon4
              size={25}
              name={'dots-three-vertical'}
              color={BaseColors.white}
            />
          </TouchableOpacity>

          {isPopupVisible && (
            <View style={style.overlay}>
              <View style={style.popup}>
                {from !== 'user' ? (
                  <View style={style.setWidth}>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() => (setIsPopupVisible(false), setModal(true))}
                    >
                      <Icon
                        size={22}
                        style={[style.popupText, { marginRight: 5 }]}
                        name="add"
                      />
                      <Text style={style.popupText}>
                        {translate('AddPicture')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() => (
                        setIsPopupVisible(false),
                        navigation.navigate('EditProfile')
                      )}
                    >
                      <Icon1
                        size={20}
                        style={[style.popupText, { marginRight: 5 }]}
                        name="edit"
                      />
                      <Text style={style.popupText}>
                        {translate('editProfile')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() =>
                        navigation.navigate('SettingsStackNavigator')
                      }
                    >
                      <Icon1
                        size={23}
                        style={[style.popupText, { marginRight: 7 }]}
                        name="gear"
                      />
                      <Text style={style.popupText}>
                        {translate('Settings')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() => (
                        setIsPopupVisible(false),
                        is_activate
                          ? setActivatePopup(true)
                          : setDeactivatePopup(true)
                      )}
                    >
                      <Icon6
                        size={23}
                        style={[style.popupText, { marginRight: 1 }]}
                        name={!is_activate ? 'user-check' : 'user-minus'}
                      />
                      <Text style={style.popupText}>
                        {!is_activate
                          ? translate('reactivate')
                          : translate('deactive')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() => (
                        setIsPopupVisible(false), setVisibleDel(true)
                      )}
                    >
                      <Icon1
                        size={23}
                        style={[style.popupText, { marginRight: 7 }]}
                        name="trash"
                      />
                      <Text style={style.popupText}>
                        {translate('deleteAccount')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={style.setWidth}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => favouriteUser(userId)}
                    >
                      <Icon1
                        size={23}
                        style={[style.popupText, { marginRight: 7 }]}
                        name={favorite ? 'heart' : 'heart-o'}
                      />
                      <Text style={style.popupText}>
                        {!favorite
                          ? translate('Favourite')
                          : translate('unFavourite')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() =>
                        navigation.navigate('ReportUser', {
                          id: userId,
                        })
                      }
                    >
                      <Icon5
                        size={23}
                        style={[style.popupText, { marginRight: 7 }]}
                        name="report"
                      />
                      <Text style={style.popupText}>
                        {translate('reportUser')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.setWidth,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() =>
                        !block
                          ? getBlock(userId)
                          : (blockUser(userId), togglePopup())
                      }
                    >
                      <Icon5
                        size={15}
                        style={{ marginRight: 7 }}
                        name="block"
                        color={
                          !block ? BaseColors.primary : BaseColors.secondary
                        }
                      />
                      <Text
                        style={[
                          style.popupText,
                          {
                            color: !block
                              ? BaseColors.primary
                              : BaseColors.secondary,
                          },
                        ]}
                      >
                        {!block
                          ? `${translate('block')} ${translate('user')}`
                          : `${translate('unblock')} ${translate('user')}`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };
  //create Room
  const createRoom = async () => {
    setChatLoader(true);

    if (isConnected) {
      try {
        // Profile socket emit
        try {
          socket.emit(
            'initializeSocket',
            { user_id: userData?.id },
            callBackData => {
              console.log('Emit in profile : ', callBackData);
            },
          );
        } catch (err) {
          console.log('Error while profile emit', err);
        }

        navigation.navigate('ChatScreen', {
          chatDetails: conversation,
        });
      } catch (error) {
        console.log('📌 ⏩ file: index.js:745 ⏩ createRoom ⏩ error:', error);
      }
      setChatLoader(false);
    } else {
      setChatLoader(false);
      console.log('📌 ⏩ file: index.js:751 ⏩ createRoom ⏩ AuthError');
    }
  };

  return (
    <View style={style.container}>
      {PageLoader ? (
        <View style={style.LoaderCon}>
          <Loader />
        </View>
      ) : userBlock ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Lottie
            source={Images.blocked}
            style={{ height: 200, width: 200, alignSelf: 'center' }}
            autoPlay
            loop
          />
          <Text style={{ fontSize: 22, color: BaseColors.textColor }}>
            {translate('Oops')}
          </Text>
          <Text style={{ fontSize: 17 }}>{translate('blockedbyuser')}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback
            onPress={() => isPopupVisible && setIsPopupVisible(false)}
          >
            <View style={style.imageContainer}>
              <ImageBackground
                source={
                  isNull(userPic)
                    ? Images.blankImage
                    : {
                        uri: from === 'user' ? userPic : userData.profile_photo,
                      }
                }
                style={style.profileimage}
                resizeMode="cover"
              >
                <GradientBox
                  children={topChild()}
                  colors={[BaseColors.black30, '#ffffff00']}
                />
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>

          {/* Round View */}
          <TouchableWithoutFeedback
            onPress={() => isPopupVisible && setIsPopupVisible(false)}
          >
            <View style={style.roundView}>
              <View style={style.threeBtn}>
                {from === 'user' && (
                  <View style={style.roundBoxes}>
                    <TouchableOpacity
                      onPress={() => addWink()}
                      style={style.topRound}
                    >
                      {BtnLoaderwink ? (
                        <Loader
                          style={{ height: commonSize, width: commonSize }}
                        />
                      ) : (
                        <CustomIcon
                          name="emojione-monotone_winking-face"
                          size={20}
                          style={style.leftImage}
                          color={BaseColors.black90}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        style.topMiddleRound,
                        {
                          backgroundColor: BtnLoaderheart
                            ? BaseColors.white
                            : BaseColors.primary,
                        },
                      ]}
                      onPress={() =>
                        isSubscribed
                          ? sendUserRequest(userId)
                          : navigation.navigate('PaymentMethod', {
                              from: 'Profile',
                            })
                      }
                    >
                      {BtnLoaderheart ? (
                        <Loader
                          style={{
                            height: commonSize,
                            width: commonSize,
                          }}
                        />
                      ) : (
                        <Icon
                          name={match ? 'heart' : 'heart-outline'}
                          size={45}
                          color={BaseColors.white}
                        />
                      )}
                    </TouchableOpacity>
                    {/* if users are already friends then redirect to chat screen after click on chat icon */}
                    <TouchableOpacity
                      onPress={() => {
                        if (chatData?.free_chat) {
                          createRoom();
                        } else {
                          navigation.navigate('PaymentMethod');
                        }
                      }}
                      style={style.topRound}
                    >
                      {chatLoader ? (
                        <Loader
                          style={{
                            height: commonSize,
                            width: commonSize,
                          }}
                        />
                      ) : (
                        <MCIcon
                          size={25}
                          color={BaseColors.primary}
                          name="message-processing-outline"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                {from === 'user' && match && (
                  <TouchableOpacity
                    style={style.matched}
                    onPress={() =>
                      navigation.navigate('MatchScreen', { from: userId })
                    }
                  >
                    <Text style={{ color: BaseColors.primary, fontSize: 17 }}>
                      {translate('its_a_match')}
                    </Text>
                  </TouchableOpacity>
                )}
                <View
                  style={[
                    style.userInfo,
                    { paddingHorizontal: IOS ? BaseSetting.nWidth / 5.5 : 0 },
                  ]}
                >
                  <Text style={style.userTitle}>
                    {from === 'user' ? userName : userData?.nick_name}, {age}
                  </Text>
                </View>
                {/* Basic Details */}
                <View style={style.details}>
                  {basicDetails?.map(item => {
                    return (
                      <View style={[style.userRow]}>
                        <Text
                          style={[
                            style.iconStyle,
                            { marginHorizontal: item?.id === 3 ? 10 : 0 },
                          ]}
                        >
                          {item.icon}
                        </Text>

                        <Text
                          style={{
                            color: BaseColors.secondary,
                            flex: 1,
                            marginHorizontal:
                              item?.id === 3 || item?.id === 4 ? 5 : 0,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                {/* ABOUT ME AREA */}
                <View style={style.about}>
                  <Text style={style.titleTag}>{translate('bio')}</Text>
                  <Text style={style.bio}>{bio}</Text>
                </View>
                {/* HOBBY */}
                {!isEmpty(hobby) && (
                  <View style={style.about}>
                    <Text style={style.titleTag}>{translate('Hobby')}</Text>
                  </View>
                )}
                <View style={style.hobbyData}>
                  <View style={style.hobbyCollection}>
                    {hobby?.map(item => {
                      return (
                        <SChip
                          type="outlined"
                          text={item.name}
                          shape="round"
                          chipStyle={style.chipStyle}
                        />
                      );
                    })}
                  </View>
                </View>
                {/* LIMIT */}
                {!isEmpty(limit) && (
                  <View style={style.about}>
                    <Text style={[style.titleTag, { marginLeft: -5 }]}>
                      {translate('Limitations')}
                    </Text>
                  </View>
                )}
                <View style={style.hobbyData}>
                  <View style={style.hobbyCollection}>
                    {limit?.map(item => {
                      return (
                        <SChip
                          type="outlined"
                          text={item.name}
                          shape="round"
                          chipStyle={style.chipStyle}
                        />
                      );
                    })}
                  </View>
                </View>

                <View style={{ marginTop: 15 }} />
                {/* CHARACTERISTICS */}

                <TouchableOpacity
                  onPress={() => (finish ? closeChar() : openChar())}
                  style={style.touchTitle}
                >
                  <Text
                    style={[
                      style.titleTag,
                      {
                        color: !finish
                          ? BaseColors.secondary
                          : BaseColors.primary,
                      },
                    ]}
                  >
                    {translate('Characteristic')}
                  </Text>
                  <Icon2
                    name={finish ? 'upcircle' : 'downcircle'}
                    size={22}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>

                {character?.map(item => {
                  return (
                    <Animated.View
                      style={[style.charContainer, { height: height }]}
                    >
                      <Text style={style.charTitle}>{item?.title}</Text>
                      <Text style={{ fontSize: 14, color: BaseColors.black90 }}>
                        {item?.name?.length > 20
                          ? item?.name.slice(0, 30)
                          : item?.name}
                      </Text>
                    </Animated.View>
                  );
                })}
                {/* INTERESTS */}

                <TouchableOpacity
                  onPress={() =>
                    finishInterests ? closeInterests() : openInterests()
                  }
                  style={style.touchTitle}
                >
                  <Text
                    style={[
                      style.titleTag,
                      {
                        color: !finishInterests
                          ? BaseColors.secondary
                          : BaseColors.primary,
                      },
                    ]}
                  >
                    {translate('Interest')}
                  </Text>
                  <Icon2
                    name={finishInterests ? 'upcircle' : 'downcircle'}
                    size={22}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>

                {interests?.map(item => {
                  return (
                    <Animated.View
                      style={[style.charContainer, { height: heightIn }]}
                    >
                      <Text style={style.charTitle}>{item?.title}</Text>
                      <Text style={{ fontSize: 14, color: BaseColors.black90 }}>
                        {item?.name?.length > 20
                          ? item?.name.slice(0, 30)
                          : item?.name}
                      </Text>
                    </Animated.View>
                  );
                })}

                {/* Gallery */}
                <View style={style.galleryData}>
                  {isArray(userPhotos) && !isEmpty(userPhotos) && (
                    <View style={style.galleryTop}>
                      <Text style={style.titleTag}>{translate('Gallery')}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Gallery', {
                            userType: from,
                            data: userId,
                          })
                        }
                      >
                        <Text style={{ color: BaseColors.primary }}>
                          {translate('seeAll')} &nbsp;
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View
                  style={[
                    style.images,
                    {
                      justifyContent:
                        userPhotos?.length < 3 ? 'flex-start' : 'space-around',
                    },
                  ]}
                >
                  {userPhotos
                    ?.map(item => {
                      return (
                        <InfoCard style={style.getPics} Img={item?.photo} />
                      );
                    })
                    .slice(0, 2)}
                </View>
                {/* Video */}
                <View style={style.galleryData}>
                  {!isEmpty(video) && !isNull(video) ? (
                    <View>
                      <View style={style.galleryTop}>
                        <Text style={style.titleTag}>{translate('Video')}</Text>
                      </View>

                      <View style={style.videoStyle}>
                        {VideoLoader && (
                          <Loader small style={style.VideoLoader} />
                        )}
                        <VideoPlayer
                          video={{ uri: video }}
                          disableFullscreen
                          maxBitRate={2000000} // 2 megabits
                          rate={1}
                          showDuration
                          onLoadStart={() => setVideoLoader(true)}
                          onLoad={() => setVideoLoader(false)}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
      <CModal
        onRequestClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPressOverlay={() => {
          setVisible(false);
        }}
        modalType="bottom"
        modalStyle={style.modalStyle}
        children={modalChildren(null)}
      />
      <CModal
        visible={modal}
        modalType="bottom"
        modalStyle={style.modal}
        onRequestClose={() => setModal(!modal)}
        onPressOverlay={() => setModal(!modal)}
      >
        <View style={style.headLine} />
        <Text style={style.modalTitle}>{translate('AddPicture')}</Text>
        {UploadSelectArr.map((item, index) => {
          return (
            <TouchableOpacity
              style={style.uploadSelect}
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={item?.onPress}
            >
              {item?.icon}
              <Text style={style.SelectText}>{item?.title}</Text>
              {item?.rightIcon}
            </TouchableOpacity>
          );
        })}
      </CModal>
      <CModal
        modalType="bottom"
        visible={visibleDel}
        onPressOverlay={() => setVisibleDel(false)}
        onRequestClose={() => setVisibleDel(false)}
      >
        <View style={style.modalCon}>
          <Text style={style.modalText}>{translate('accountDelete')}</Text>
          <Text style={style.modalText1}>{translate('deleteMSG')}</Text>
          <View style={style.btnCon}>
            <Button
              title={translate('cancel')}
              type="outlined"
              style={style.btnStyleDel}
              onPress={() => setVisibleDel(false)}
            />
            <Button
              loading={BtnLoader}
              title={translate('delete')}
              style={style.btnStyleDel}
              onPress={() => HandelDelete()}
            />
          </View>
        </View>
      </CModal>
      <CModal
        modalType="bottom"
        visible={activatePopup}
        onPressOverlay={() => setActivatePopup(false)}
        onRequestClose={() => setActivatePopup(false)}
      >
        <View style={style.modalCon}>
          <Text style={style.modalText}>{translate('conformDeactive')}</Text>
          <Text style={style.modalText1}>{translate('deactiveMSG')}</Text>
          <View style={style.btnCon}>
            <Button
              title={translate('cancel')}
              type="outlined"
              style={style.btnStyleDel}
              onPress={() => setActivatePopup(false)}
            />
            <Button
              loading={BtnLoader}
              title={translate('deactive')}
              style={style.btnStyleDel}
              onPress={() => handleDeactivate()}
            />
          </View>
        </View>
      </CModal>
      <CModal
        modalType="bottom"
        visible={deactivatePopup}
        onPressOverlay={() => setDeactivatePopup(false)}
        onRequestClose={() => setDeactivatePopup(false)}
      >
        <View style={style.modalCon}>
          <Text style={style.modalText}>{translate('confirmReactive')}</Text>
          <View style={style.btnCon}>
            <Button
              title={translate('cancel')}
              type="outlined"
              style={style.btnStyleDel}
              onPress={() => setDeactivatePopup(false)}
            />
            <Button
              loading={BtnLoader}
              title={translate('reactivate')}
              style={style.btnStyleDel}
              onPress={() => handleReactivate()}
            />
          </View>
        </View>
      </CModal>
    </View>
  );
};

export default Profile;
