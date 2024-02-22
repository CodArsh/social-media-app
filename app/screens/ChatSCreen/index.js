/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FEIcon from 'react-native-vector-icons/Feather';
import { BaseColors, FontFamily } from '@config/theme';
import RNFS from 'react-native-fs';
import { isEmpty, isUndefined, toNumber } from 'lodash';
import { styles } from './styles';
import EmojiPicker from 'rn-emoji-keyboard';
import CModal from '@components/CModal';
import _ from 'lodash';
import Button from '@components/Button';
import { getApiData, getApiDataProgress } from '../../utils/apiHelper';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AuthActions from '../../redux/reducers/auth/actions';
import { CustomIcon } from '@config/LoadIcons';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import CallScreen from '@components/callScreen';
import JoinScreen from '@components/joinCall';
import ImagePicker from '../../lib/react-native-image-crop-picker';
import ViewImageModal from '@components/ViewImageModal';
import Loader from '@components/Loader/Loader';
import { Images } from '@config';
import Lottie from 'lottie-react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import socket from '@utils/socket';
import AudioSetup from '@screens/AudioSetup';
import Sound from 'react-native-sound';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// eslint-disable-next-line no-undef
export default ChatScreen = props => {
  const classComponentRef = useRef();
  const user = props?.route?.params?.chatDetails;

  const { setCallStatus, setActiveProfile } = AuthActions;
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      props.navigation.navigate('MessageStackNavigator');
    });

    return unsubscribe;
  }, [props.navigation]);

  const { languageData } = useSelector(state => state.language);
  const dispatch = useDispatch();
  const CallScreenRef = useRef();
  const JoinCallRef = useRef();
  const [msg, setMsg] = useState('');
  const { isSubscribed } = useSelector(state => state.auth);

  const auth = useSelector(state => state.auth);

  const [EmojiOpen, setEmojiOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [absWords, setAbsWords] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  // const [roomID, setRoomID] = useState(user.token ? user.token : false);
  const [lipLoader, setLipLoader] = useState(false);
  const [callbool, setCallBool] = useState(false);
  const [callType, setCallType] = useState(false);
  const [callInfo, setCallInfo] = useState(false);
  const [imgUploader, setImgUploader] = useState(false);
  const [block, setBlock] = useState(user?.is_blocked);
  const [docModal, setDocModal] = useState(false);
  const [modal, setModal] = useState(false);

  const [moreLoad, setMoreLoad] = useState(false);

  //socket states
  const [pData, setPData] = useState(user);
  const [pagination, setPagination] = useState({});
  const { userData } = useSelector(state => state?.auth);
  const [chatData, setChatData] = useState([]);
  const [vPlay, setVplay] = useState(Array(chatData.length).fill(false));
  const [bottomModal, setBottomModal] = useState({
    open: false,
    type: '',
    msg: '',
  });
  const [imageModal, setImageModal] = useState({
    open: false,
    url: '',
  });
  const iceBreackerText = [
    {
      id: '1',
      text: translate('iceBreakerText1'),
    },
    {
      id: '2',
      text: translate('iceBreakerText2'),
    },
    {
      id: '3',
      text: translate('iceBreakerText3'),
    },
    {
      id: '4',
      text: translate('iceBreakerText4'),
    },
  ];
  const modType = {
    alert: 'alert',
    block: 'block',
    deletChat: 'deleteChatHistory',
    abuse: 'abusiveWords',
  };
  // UPDATE BADGES
  useEffect(() => {
    getChatData(true, false, pData?.conv_id);
    receiveMessage();
    receiveTyping();
    receiveStopTyping();
    AbusiveWords();
  }, []);

  const AbusiveWords = async () => {
    const endPoint = `${BaseSetting.endpoints.commonList}?category_id=${BaseSetting.categoryId.abusiveWords}&language_id=${languageData}`;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setAbsWords(res?.data);
      } else {
        setAbsWords([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:143 ⏩ AbusiveWords ⏩ error:', error);
    }
  };

  const IOS = Platform.OS === 'ios';

  const [deleteChatLoader, setDeleteChatLoader] = useState(false);

  const openCamera = async () => {
    if (IOS) {
      ImagePicker.openCamera({
        cropping: false,
      }).then(image => {});
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
            cropping: false,
          }).then(image => {});
        } else {
          Toast.show({
            text1: 'Camera permission denied',
            type: 'error',
          });
        }
      } catch (err) {
        console.warn('err====>>>', err);
      }
    }
  };
  // function for openGallery

  const openGallery = () => {
    ImagePicker?.openPicker({
      mediaType: 'photo',
    }).then(image => {
      const imgFile = {
        uri: image?.path,
        name: image?.path.substr(image?.path.lastIndexOf('/') + 1),
        type: image?.mime,
      };
      sendFile(imgFile, image?.mime, 'image');
    });
  };

  const handleImageLoad = (item, index) => {
    let dummyArr = [...messages];
    dummyArr.map((e, i) => {
      if (i === index) {
        e.load = true;
      }
      setMessages(dummyArr);
    });
  };

  const handleImageLoadEnd = (item, index) => {
    let dummyArr = [...messages];
    dummyArr.map((e, i) => {
      if (i === index) {
        e.load = false;
      }
      setMessages(dummyArr);
    });
  };

  function dateToFromNowDaily(myDate) {
    return moment(myDate).calendar(null, {
      sameDay: `[${translate('todayStamp')}]`,
      nextDay: `[${translate('tomorrowStamp')}]`,
      lastDay: `[${translate('yesterdayStamp')}]`,
      nextWeek: 'DD/MM/YYYY',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY',
    });
  }
  const renderChatBubble = ({ item, index }) => {
    const itemDate = moment.unix(item?.createdAt).format('DD-MM-YYYY');
    const prevItem = index >= 0 ? chatData[index + 1] : null;
    const prevItemDate = prevItem
      ? moment.unix(prevItem?.createdAt).format('DD-MM-YYYY')
      : null;

    const Dtime = itemDate !== prevItemDate ? prevItemDate : null;

    return (
      <>
        {item?.type === 'text' ? (
          <View
            style={[
              styles.chatContainer,
              {
                flexDirection:
                  item.sender_id !== auth.userData.id ? 'row-reverse' : 'row',
                justifyContent: 'flex-end',
              },
            ]}
          >
            <View
              style={[
                styles.row,
                item.sender_id !== auth.userData.id
                  ? {
                      backgroundColor: BaseColors.secondary + 20,
                      borderBottomStartRadius: 2,
                    }
                  : {
                      backgroundColor: BaseColors.primary,
                      borderBottomEndRadius: 2,
                    },
              ]}
            >
              <View
                style={[
                  styles.chatMsgBack,
                  {
                    paddingHorizontal: 5,
                    height: 'auto',
                  },
                ]}
              >
                {item.text && !_.isEmpty(item.text) ? (
                  <View>
                    {item.text && !_.isEmpty(item.text) ? (
                      <Text
                        style={[
                          {
                            fontFamily: FontFamily.regular,
                            color:
                              item.sender_id !== auth.userData.id
                                ? BaseColors.secondary
                                : BaseColors.white,
                          },
                        ]}
                      >
                        {item.text}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  // position: 'absolute',
                  position: item?.text?.length > 30 ? 'absolute' : 'relative',
                  width: 60,
                  bottom: 0,
                  right: 10,
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 10,
                      fontFamily: FontFamily.regular,
                      color:
                        item.sender_id !== auth.userData.id
                          ? BaseColors.secondary + 90
                          : BaseColors.white + 90,
                      textAlign: 'right',
                    },
                  ]}
                >
                  {moment.unix(item.createdAt).format('HH:mm')}
                </Text>
              </View>
            </View>
          </View>
        ) : item?.type === 'image' ? (
          <View
            style={[
              styles.chatContainer,
              {
                flexDirection:
                  item.sender_id !== auth.userData.id ? 'row-reverse' : 'row',
                justifyContent: 'flex-end',
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              style={[
                {
                  width: 150,
                  height: 150,
                  borderWidth: 3,
                  borderColor:
                    item.sender_id === auth.userData.id
                      ? BaseColors.primary
                      : BaseColors.secondary + 90,
                  borderRadius: 25,
                  overflow: 'hidden',
                },
                item.sender_id !== auth.userData.id
                  ? { borderBottomStartRadius: 0 }
                  : { borderBottomEndRadius: 0 },
              ]}
              onPress={() =>
                !item?.load &&
                setImageModal({ open: true, url: item?.file_name })
              }
            >
              {item?.load && (
                <ActivityIndicator
                  size="large"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: BaseColors.secondary + 90,
                  }}
                  color={BaseColors.primary}
                />
              )}
              <Image
                source={{
                  uri: item.file_name,
                }}
                style={[
                  {
                    flex: 1,
                    resizeMode: 'cover',
                  },
                  IOS && {
                    borderRadius: 21,
                    borderBottomEndRadius:
                      item.sender_id !== auth.userData.id ? 20 : 0,
                    borderBottomStartRadius:
                      item.sender_id !== auth.userData.id ? 0 : 21,
                  },
                ]}
                onLoadStart={() => handleImageLoad(item, index)}
                onLoadEnd={() => {
                  handleImageLoadEnd(item, index);
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  width: 60,
                  bottom: 0,
                  right: 10,
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 10,
                      fontFamily: FontFamily.regular,
                      color: BaseColors.white,
                      shadowColor: '#000',
                      textAlign: 'right',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.4,
                      shadowRadius: 4,
                      elevation: 8,
                      backgroundColor: BaseColors.black10,
                    },
                  ]}
                >
                  {moment.unix(item.createdAt).format('HH:mm')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : item?.type === 'audio' ? (
          <View
            style={[
              styles.chatContainer,
              {
                flexDirection:
                  item.sender_id !== auth.userData.id ? 'row-reverse' : 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={[
                {
                  flexDirection:
                    item.sender_id !== auth.userData.id ? 'row-reverse' : 'row',
                  justifyContent:
                    item.sender_id === auth.userData.id
                      ? 'flex-start'
                      : 'flex-end',
                  height: 50,
                  width: 140,
                  borderRadius: 25,
                  // padding: 5,
                  alignItems: 'center',
                  paddingHorizontal: 5,
                },
                item.sender_id !== auth.userData.id
                  ? {
                      backgroundColor: BaseColors.secondary + 20,
                      borderBottomStartRadius: 2,
                    }
                  : {
                      backgroundColor: BaseColors.primary,
                      borderBottomEndRadius: 2,
                    },
              ]}
            >
              {!vPlay[index] ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => playItemValidation(item, index)}
                    style={styles.playPause}
                  >
                    <Icon
                      name="controller-play"
                      size={28}
                      color={
                        item.sender_id === auth.userData.id
                          ? BaseColors.white
                          : BaseColors.black70
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 2,
                      width: 50,
                      backgroundColor:
                        item.sender_id === auth.userData.id
                          ? BaseColors.white
                          : BaseColors.black70,
                    }}
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => handleStop(item, index)}
                    style={styles.playPause}
                  >
                    <Icon
                      name="controller-stop"
                      size={28}
                      color={
                        item.sender_id === auth.userData.id
                          ? BaseColors.white
                          : BaseColors.black70
                      }
                    />
                  </TouchableOpacity>
                  <Lottie
                    source={Images.waveAnim}
                    style={{
                      height: 60,
                      width: 60,
                      position: 'absolute',
                      left: IOS ? 11 : 16,
                      top: IOS ? -5 : -8,
                    }}
                    autoPlay
                    loop
                  />
                </View>
              )}
              <View
                style={[
                  { position: 'absolute' },
                  item.sender_id !== auth.userData.id
                    ? { left: 5 }
                    : { right: 5 },
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 10,
                      fontFamily: FontFamily.regular,
                      color:
                        item.sender_id === auth.userData.id
                          ? BaseColors.white
                          : BaseColors.black80,
                    },
                  ]}
                >
                  {moment.unix(item.createdAt).format('HH:mm')}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {Dtime && (
          <View style={styles.dateTimeCon}>
            <Text style={styles.dateTimeText}>{Dtime}</Text>
          </View>
        )}
      </>
    );
  };
  const [playData, setPlayData] = useState();
  const [playIndex, setPlayIndex] = useState();

  // This function will play audio and if already other audio is playing, first stop that
  const playItemValidation = async (item, index) => {
    if (isUndefined(playData) || isEmpty(playData)) {
      handlePlay(item, index);
    } else {
      handleStop(playData, playIndex);
    }
  };

  const [sound, setSound] = useState(null);

  const handlePlay = (item, index) => {
    setPlayData(item);
    setPlayIndex(index);
    const updatedArray = [...vPlay];
    updatedArray[index] = true;
    setVplay(updatedArray);
    if (Platform.OS === 'ios') {
      try {
        const newSound = new Sound(item?.file_name, '', error => {
          if (error) {
            console.error('Failed to load the sound', error);
            return;
          }

          newSound.play(success => {
            if (success) {
              console.log('Successfully played the sound');
            } else {
              console.error('Failed to play the sound');
            }
          });

          setSound(newSound);
          console.log('dur  : ', newSound.getDuration());
          console.log('dur  : ', newSound.getCurrentTime);
          // Set up an interval to check playback status
          const intervalId = setInterval(() => {
            // Check if the current time exceeds or equals the duration
            if (!newSound.isPlaying()) {
              console.log('Playback completed');
              clearInterval(intervalId);
              handleStop(item, index);
              stopSound(); // Call stopSound when playback is completed
            }
          }, 500);
        });
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    } else {
      PlayAudio(item?.file_name);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        console.log('Sound stopped');
      });
      sound.release();
      setSound(null);
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );

  // for ios only
  const generateIOSfile = async () => {
    const documentDirectory = RNFS.CachesDirectoryPath;
    await RNFS.mkdir(documentDirectory);
    const fileName = `sound.m4a`;
    const filePath = `${documentDirectory}/${fileName}`;
    return filePath;
  };

  const [updatedSound, setUpdatedSound] = useState(null);
  const startRecordiOS = async () => {
    setTimeRemaining(120);
    handleStartTimer();
    setRecordAccess(true);
    setStartRecord(false);
    try {
      await generateIOSfile();
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setUpdatedSound(result);
      console.log(result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecordiOS = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      // audioRecorderPlayer.current.removeRecordBackListener();
      setIsRecording(false);
      console.log('stop : ', result);
      return result;
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  useEffect(() => {
    // Release the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  const handleStop = (item, index) => {
    const updatedArray = [...vPlay];
    updatedArray[index] = false;
    setVplay(updatedArray);
    if (Platform.OS === 'ios') {
      stopSound(); // for ios only
    } else {
      StopAudio();
    }
    setPlayData('');
    setPlayIndex('');
  };

  // Timer Counting
  const initialTime = 120; // 2 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let interval;

    if (isCounting && timeRemaining > 0) {
      console.log('time... ', timeRemaining);
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      handleVoiceSend();
      setIsCounting(false);
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount or when isCounting is false
  }, [isCounting, timeRemaining]);

  const handleStartTimer = () => {
    // Start the countdown only if it's not already counting
    if (!isCounting) {
      setIsCounting(true);
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const optionTab = [
    {
      id: 1,
      name: block
        ? `${translate('unblock')} ${translate('user')}`
        : `${translate('block')} ${translate('user')}`,
      icon: (
        <CustomIcon name="block" size={18} color={BaseColors.textSecondary} />
      ),
    },
    {
      id: 2,
      name: translate('ReportsUser'),
      icon: <MIcons name="report" size={24} color={BaseColors.textSecondary} />,
    },
    messages.length > 0 && {
      id: 3,
      name: translate('Deletechathistory'),
      icon: (
        <MCIcons
          name="chat-remove-outline"
          size={20}
          color={BaseColors.textSecondary}
        />
      ),
    },
    !block && {
      id: 4,
      name: user?.is_block ? null : translate('ViewProfile'),
      icon: (
        <CustomIcon name="profile" size={18} color={BaseColors.textSecondary} />
      ),
    },
  ];

  const HandleEmoji = emoji => {
    setMsg(preVal => preVal.concat(emoji.emoji));
  };

  // block user api call
  async function blockUser() {
    setBtnLoader(true);
    try {
      const res = await getApiData(
        `${BaseSetting.endpoints.blockUser}?blocked_user_id=${user?.user_id}`,
        'GET',
      );
      if (res?.status) {
        setBlock(!block);

        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        // deleteChatHistoryCall();
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
      }
      setBtnLoader(false);
      setBottomModal({
        type: '',
        open: false,
        msg: '',
      });
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:89 ⏩ RemoveFavourite ⏩ error:',
        error,
      );
      setBtnLoader(false);
      setBottomModal({
        type: '',
        open: false,
        msg: '',
      });
    }
  }

  const getAction = id => {
    if (id === 1) {
      setBottomModal({
        type: modType?.block,
        open: true,
      });
    } else if (id === 2) {
      props.navigation.navigate('ReportUser', {
        id: user.user_id,
      });
    } else if (id === 3) {
      setBottomModal({
        type: modType?.deletChat,
        open: true,
      });
    } else {
      dispatch(setActiveProfile(true));
      props.navigation.navigate('Profile', {
        from: 'user',
        id: user?.user_id,
      });
    }
  };
  const Popup = () => {
    return (
      <View style={styles.popup}>
        {optionTab?.map((item, index) => {
          if (item) {
            return (
              <TouchableOpacity
                style={styles.popupTabs}
                onPress={() => getAction(item?.id)}
                key={item.id}
                activeOpacity={BaseSetting.buttonOpacity}
              >
                <View
                  style={[
                    { width: '15%' },
                    item?.id === 2 && { marginLeft: -3, marginRight: 3 },
                  ]}
                >
                  {item.icon}
                </View>
                <Text style={styles.popupText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  // block_user modal render item
  const BlockUser = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}>{translate('AreYouSure')}</Text>
        <Text style={styles.desc}>
          {user?.is_blocked
            ? `${translate('unblockSubTitle')}`
            : `${translate('blockSubTitle')}`}
        </Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() =>
                setBottomModal({
                  type: '',
                  open: false,
                  msg: '',
                })
              }
              title={translate('cancel')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              type="outlined"
              onPress={() => blockUser()}
              loading={btnLoader}
              title={
                block ? `${translate('unblock')}` : `${translate('block')}`
              }
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // delete chat history modal render item
  const DeleteChatHistory = () => {
    return (
      <View style={styles.deleteImg}>
        <Text style={styles.topTitle}>{translate('AreYouSure')}</Text>
        <Text style={styles.desc}>{translate('wanttodeletechat')}</Text>
        <View style={styles.btnStyle}>
          <TouchableOpacity>
            <Button
              onPress={() =>
                setBottomModal({
                  type: '',
                  open: false,
                  msg: '',
                })
              }
              title={translate('cancel')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              type="outlined"
              // onPress={() => deleteChatHistoryCall()}
              loading={deleteChatLoader}
              title={translate('Confirm')}
              style={styles.btnIn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onHangUp = e => {
    if (e) {
      onConferenceTerminated();
    }
  };

  const onConferenceTerminated = nativeEvent => {
    setCallBool(false);
    setCallInfo(false);
    dispatch(setCallStatus(false));
  };

  const HandleSubscription = bool => {
    if (isSubscribed) {
      if (user?.is_subscribed) {
        // bool ? HandleVideoCall() : HandleAudioCall();
      } else {
        setBottomModal({
          type: modType?.alert,
          open: true,
          msg: `${user?.name} ${translate('otherPersonSubscription')}`,
        });
      }
    } else {
      props.navigation.navigate('PaymentMethod');
    }
  };

  const SubscriptionAlert = () => {
    return (
      <>
        <FEIcon
          name="alert-triangle"
          color={BaseColors.alertRed}
          size={50}
          style={{ alignSelf: 'center', marginBottom: 20 }}
        />
        <Text
          style={{
            fontFamily: FontFamily.bold,
            color: BaseColors.secondary,
            textAlign: 'center',
            lineHeight: 20,
            fontSize: 15,
          }}
        >
          {bottomModal?.msg}
        </Text>
      </>
    );
  };

  // >>>>> SOCKET IO START FROM HERE <<<<<

  const readAll = () => {
    const data = {
      conv_id: pData?.conv_id,
      user_id: userData?.id,
      type: 'single',
      send_to: pData?.user_id,
    };
    try {
      socket.emit('messageReadAll', data, callBackData => {});
    } catch (error) {
      console.log('📌 ⏩ file: index.js:107 ⏩ readAll ⏩ error:', error);
    }
  };

  // SHOW CONVERSATION DATA
  const getChatData = async (bool, pg, conv_id) => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;

    let page_no = 0;
    if (bool) {
      page_no = 1;
    } else {
      page_no = cPage + 1;
    }

    const Data = {
      user_id: pData?.user_id,
      conv_id: pData?.conv_id ? pData?.conv_id : conv_id,
      page: page_no,
    };
    try {
      socket.emit('singleConversation', Data, callBackData => {
        if (callBackData?.status) {
          const NewList = callBackData?.data?.getMessage;

          setPagination(callBackData?.data?.pagination);
          setChatData(NewList);
          // console.log('NNNN;;;;;;;;;; ', NewList);
          readAll();
        } else {
          setChatData([]);
        }
      });
    } catch (error) {
      console.log('📌 ⏩ file: index.js:312 ⏩ getChatData ⏩ error:', error);
    }
  };

  // SEND MESSAGE HANDLING
  const handleSend = textMsg => {
    stopTyping();
    setMic(true);
    const data = {
      conv_id: user?.conv_id ? user?.conv_id : pData?.conv_id,
      text: textMsg,
      sender_id: userData?.id,
      receiver_id: pData?.user_id ? pData?.user_id : user.user_id,
      type: 'text',
      isNew: isEmpty(chatData) ? true : false,
    };
    try {
      setMsg('');
      socket.emit('sendMessage', data, callBackData => {
        if (callBackData?.status) {
          setPData(preVal => {
            return {
              ...preVal,
              conv_id: callBackData?.data?.conv_id,
            };
          });
          getChatData(true, false, callBackData?.data?.conv_id);
        } else {
          Toast.show({ type: 'error', text1: callBackData?.message });
        }
      });
    } catch (error) {
      console.log('📌 ⏩ file: index.js:115 ⏩ handleSend ⏩ error:', error);
    }
  };

  // RECEIVED MESSAGE
  const receiveMessage = () => {
    try {
      socket.on('receiveMessage', callBackData => {
        if (callBackData) {
          if (!pData?.conv_id) {
            setPData(preVal => {
              return {
                ...preVal,
                conv_id: callBackData?.conv_id,
              };
            });
            getChatData(true, false, callBackData?.conv_id);
          } else {
            getChatData(true, false);
          }
        }
      });
    } catch (error) {
      console.log('📌 ⏩ file: index.js:51 ⏩ receiveMessage ⏩ error:', error);
    }
  };

  // TYPING BUNDLE (Start typing, Stop typing)
  const [typingEnable, setTypingEnable] = useState(false);
  const isTyping = () => {
    const data = {
      conv_id: pData?.conv_id,
      sender_id: userData?.id,
      receiver_id: pData?.user_id,
    };
    try {
      socket.emit('isTyping', data, callBackData => {});
    } catch (error) {
      console.log('📌 ⏩ file: index.js:215 ⏩ isTyping ⏩ error:', error);
    }
  };

  const receiveTyping = () => {
    try {
      socket.on('receiveTyping', callBackData => {
        if (callBackData) {
          Number(callBackData?.receiver_id) === Number(userData?.id) &&
          Number(callBackData?.sender_id) === Number(pData?.user_id)
            ? setTypingEnable(true)
            : null;
        }
      });
    } catch (error) {
      console.log('📌 ⏩ file: index.js:234 ⏩ receiveTyping ⏩ error:', error);
    }
  };

  const stopTyping = () => {
    const data = {
      conv_id: pData?.conv_id,
      sender_id: userData?.id,
      receiver_id: pData?.user_id,
    };
    try {
      socket.emit('stopTyping', data, callBackData => {});
    } catch (error) {
      console.log('📌 ⏩ file: index.js:250 ⏩ stopTyping ⏩ error:', error);
    }
  };

  const receiveStopTyping = () => {
    try {
      socket.on('receiveStopTyping', callBackData => {
        if (callBackData) {
          setTypingEnable(false);
        }
      });
    } catch (error) {
      console.log(
        '📌 ⏩ file: index.js:263 ⏩ receiveStopTyping ⏩ error:',
        error,
      );
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      stopTyping();
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [msg]);

  // SEND FILE MODULE
  const sendFile = async (path, imageType, dataType) => {
    const timestamp = new Date().getTime();
    setTimeRemaining(0);
    const endP = BaseSetting.imageUpload;
    const method = 'POST';

    const audioObj = {
      name: Platform.OS === 'ios' ? `${timestamp}.m4a` : 'demo_sound.mp3',
      type: 'audio/mp3',
      uri: Platform.OS === 'ios' ? updatedSound : path,
    };
    let updatedAudioData = null;
    if (dataType === 'audio') {
      const uriParts = audioObj.uri?.split('/');
      const dynamicPart = uriParts[uriParts?.length - 1]; // Get the last part of the URI
      const dynamicName = dynamicPart?.substring(6);

      updatedAudioData = {
        ...audioObj,
        name: dynamicName,
      };
    }

    const data = {
      sender_id: userData?.id.toString(),
      conv_id: pData?.conv_id.toString() || '',
      receiver_id: pData?.user_id.toString(),
      text: dataType,
      type: dataType.toString(),
      image:
        dataType === 'image'
          ? path
          : Platform.OS === 'ios'
          ? audioObj
          : updatedAudioData,
      image_type: dataType === 'image' ? imageType.toString() : 'audio/mp3',
      isNew: isEmpty(chatData) ? true : false,
      conv_type: 'chat',
    };
    try {
      const res = await getApiDataProgress(
        endP,
        method,
        data,
        {},
        BaseSetting.imageUpload,
      );
      if (res?.status) {
        setMsg('');
        setPData(preVal => {
          return {
            ...preVal,
            conv_id: res?.data?.conv_id,
          };
        });
        await getChatData(true, false, res?.data?.conv_id);
      } else {
        if (dataType !== 'audio') {
          Toast.show({ text1: res?.message, type: 'error' });
        }
      }
    } catch (error) {
      try {
        const res = await getApiDataProgress(
          endP,
          method,
          data,
          {},
          BaseSetting.imageUpload,
        );
        if (res?.status) {
          setMsg('');
          setPData(preVal => {
            return {
              ...preVal,
              conv_id: res?.data?.conv_id,
            };
          });
          await getChatData(true, false, res?.data?.conv_id);
        } else {
          if (dataType !== 'audio') {
            Toast.show({ text1: res?.message, type: 'error' });
          }
        }
      } catch (err) {
        console.log('📌 ⏩ file: index.js:861 ⏩ sendFile ⏩ error:', err);
      }
    }
  };

  const getMoreData = async () => {
    const cPage = pagination?.currentPage
      ? toNumber(pagination?.currentPage)
      : 0;
    const tPage = pagination?.totalPage ? toNumber(pagination?.totalPage) : 0;
    if (pagination?.isMore === true && cPage < tPage) {
      setMoreLoad(true);
      getChatData(false);
    }
  };

  const footerComponent = () => {
    return moreLoad ? <Loader small /> : <View style={styles.container2} />;
  };

  const [green, setGreen] = useState(false);

  // AUDIO HERE

  const [mic, setMic] = useState(true);
  const [startRecord, setStartRecord] = useState(false);
  const [recordAccess, setRecordAccess] = useState(false);
  const RecordingStart = () => {
    // Check if the ref is defined and if the method exists
    if (classComponentRef.current && classComponentRef.current.startRecord) {
      classComponentRef.current.startRecord();
    } else {
      console.warn('Method or ref is not defined');
    }
  };

  const RecordingStop = async () => {
    // Check if the ref is defined and if the method exists
    if (classComponentRef.current && classComponentRef.current.stopRecord) {
      const x = await classComponentRef.current.stopRecord();
      let result = x;
      if (Platform.OS === 'ios') {
        result = String(x).replace('file://', '');
      }
      return result;
    } else {
      console.warn('Method or ref is not defined');
    }
  };

  const PlayAudio = async e => {
    // Check if the ref is defined and if the method exists
    if (classComponentRef.current && classComponentRef.current.startPlay) {
      await classComponentRef.current.startPlay(e);
    } else {
      console.warn('Method or ref is not defined');
    }
  };

  const StopAudio = () => {
    // Check if the ref is defined and if the method exists
    if (classComponentRef.current && classComponentRef.current.stopPlay) {
      classComponentRef.current.stopPlay();
    } else {
      console.warn('Method or ref is not defined');
    }
  };

  // HANDLES
  const handleStartRecord = () => {
    setTimeRemaining(120);
    handleStartTimer();
    RecordingStart();
    setRecordAccess(true);
    setStartRecord(false);
  };

  const handleStopRecord = () => {
    setTimeRemaining(0);
    setStartRecord(true);
    RecordingStop();
    setRecordAccess(false);
  };

  const handleVoiceSend = async () => {
    setStartRecord(true);
    setRecordAccess(false);
    let audioFilePath = null;
    if (Platform.OS === 'ios') {
      audioFilePath = await stopRecordiOS(); // ios only
      sendFile(audioFilePath, '', 'audio');
    } else {
      audioFilePath = await RecordingStop();
      sendFile(audioFilePath, '', 'audio');
    }
  };

  // completed playback
  const handlePlaybackComplete = audioStatus => {
    console.log('Audio Status:', audioStatus);

    // You can perform actions based on the audioStatus here
    if (audioStatus === 'finished_audio') {
      handleStop(playData, playIndex);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: BaseColors.white }}>
      {callbool ? (
        callInfo ? (
          <JoinScreen
            ref={JoinCallRef}
            roomId={roomID}
            callType={callType}
            setScreen={callInfo}
            onHangUp={onHangUp}
            // isConnected={isConnected}
            callDetails={user}
          />
        ) : (
          <CallScreen
            ref={CallScreenRef}
            roomId={roomID}
            callType={callType}
            setScreen={callInfo}
            onHangUp={onHangUp}
            // isConnected={isConnected}
            callDetails={user}
          />
        )
      ) : (
        <>
          <HeaderBar
            HeaderTextStyle={{ width: '48%' }}
            HeaderText={user?.nick_name || pData?.name}
            rightComponent={
              <View style={styles.headerIconCon}>
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={styles.roundBtnCon}
                  // onPress={() => {
                  //   if (user?.is_blocked) {
                  //     setBottomModal({
                  //       type: modType?.alert,
                  //       open: true,
                  //       msg: `${user?.name} ${translate('userIsBlocked')}`,
                  //     });
                  //   } else {
                  //     HandleSubscription(true);
                  //   }
                  // }}

                  onPress={() =>
                    Toast.show({
                      text1: translate('comingSoon'),
                      type: 'success',
                    })
                  }
                >
                  <Icon2
                    name="videocam-outline"
                    size={15}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={styles.roundBtnCon}
                  // onPress={() => {
                  //   if (user?.is_blocked) {
                  //     setBottomModal({
                  //       type: modType?.alert,
                  //       open: true,
                  //       msg: `${user?.name} ${translate('userIsBlocked')}`,
                  //     });
                  //   } else {
                  //     HandleSubscription(false);
                  //   }
                  // }}

                  onPress={() =>
                    Toast.show({
                      text1: translate('comingSoon'),
                      type: 'success',
                    })
                  }
                >
                  <Icon2
                    name="call-outline"
                    size={15}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={styles.roundBtnCon}
                  onPress={() => setModal(!modal)}
                >
                  <Icon
                    name="dots-three-vertical"
                    size={15}
                    color={BaseColors.primary}
                  />
                </TouchableOpacity>
              </View>
            }
          />
          {modal && (
            <>
              <Popup />
              <TouchableOpacity
                activeOpacity={BaseSetting.buttonOpacity}
                style={styles.overlay}
                onPress={() => {
                  modal && setModal(false);
                  docModal && setDocModal(false);
                }}
              />
            </>
          )}

          <View style={styles.mainBox}>
            {lipLoader ? (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={BaseColors.primary} />
              </View>
            ) : _.isEmpty(chatData) ? (
              <View style={styles.centerContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.iceBreackerHead}>
                    {translate('iceBreakerHead')}
                  </Text>
                  {iceBreackerText.map(item => {
                    return (
                      <TouchableOpacity
                        activeOpacity={BaseSetting.buttonOpacity}
                        style={[
                          styles.chatTextContainer,
                          item?.id === '1' || item?.id === '3'
                            ? { alignSelf: 'flex-start' }
                            : { alignSelf: 'flex-end' },
                        ]}
                        onPress={() => {
                          handleSend(item?.text);
                        }}
                      >
                        <Text style={styles.iceBreacker}>{item?.text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                  }}
                  keyExtractor={(item, index) => item?.createdAt + index}
                  data={chatData}
                  inverted={true}
                  ListFooterComponent={footerComponent}
                  renderItem={renderChatBubble}
                  showsVerticalScrollIndicator={false}
                  onEndReached={getMoreData}
                  onEndReachedThreshold={0}
                  // ListEmptyComponent={emptyComponent}
                />
                {typingEnable && (
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'relative',
                      marginTop: 5,
                    }}
                  >
                    <Text style={styles.typingText}>{translate('typing')}</Text>
                    <Lottie
                      source={Images.Typing}
                      style={{
                        height: 60,
                        width: 60,
                        position: 'absolute',
                        left: IOS ? 11 : 16,
                        top: IOS ? -5 : -8,
                      }}
                      autoPlay
                      loop
                    />
                  </View>
                )}
              </View>
            )}

            {/* Input-Text will appear when recordAccess if false, otherwise recording area will show*/}

            {!recordAccess && (
              <View style={styles.chatInputContainer}>
                <TouchableOpacity
                  activeOpacity={BaseSetting.buttonOpacity}
                  style={styles.emoji}
                  onPress={() => setEmojiOpen(true)}
                >
                  <Icon
                    name="emoji-happy"
                    size={22}
                    color={BaseColors.secondary}
                  />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    style={styles.input}
                    placeholder={
                      green ? 'Speak Something...' : translate('TypeSomething')
                    }
                    placeholderTextColor={BaseColors.secondary}
                    value={msg}
                    onChangeText={val => {
                      setGreen(false);
                      setMsg(val);
                      isTyping();
                      setMic(isEmpty(val) ? true : false);
                    }}
                    cursorColor={BaseColors.primary}
                  />
                </View>
                {imgUploader ? (
                  <View style={styles.paperclipStyle}>
                    <Loader style={{ height: 22, width: 22 }} />
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => setDocModal(!docModal)}
                      activeOpacity={BaseSetting.buttonOpacity}
                      style={styles.paperclipStyle}
                    >
                      <Icon
                        name="attachment"
                        size={20}
                        color={BaseColors.black}
                      />
                    </TouchableOpacity>
                    {docModal && (
                      <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOut}
                        style={styles.docBox}
                      >
                        <TouchableOpacity
                          style={styles.modalRowView}
                          onPress={() => {
                            setDocModal(false);
                            setTimeout(() => {
                              openCamera();
                            }, 500);
                          }}
                          activeOpacity={BaseSetting.buttonOpacity}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <CustomIcon
                              name="camera"
                              size={20}
                              color={BaseColors.textSecondary}
                            />
                            <Text style={styles.modelTxt}>
                              {translate('TakePhoto')}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.modalRowView}
                          onPress={() => {
                            setDocModal(false);
                            setTimeout(() => {
                              openGallery();
                            }, 500);
                          }}
                          activeOpacity={BaseSetting.buttonOpacity}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <FAIcon
                              name="photo"
                              size={20}
                              color={BaseColors.textSecondary}
                            />
                            <Text style={styles.modelTxt}>
                              {translate('UploadPhoto')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </Animated.View>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  activeOpacity={
                    isEmpty(msg?.trim()) ? 1 : BaseSetting.buttonOpacity
                  }
                  style={[
                    styles.sendContainer,
                    {
                      backgroundColor: green
                        ? BaseColors.limeGreen
                        : BaseColors.primary,
                    },
                  ]}
                  onPress={() => {
                    if (user?.is_blocked) {
                      setBottomModal({
                        type: modType?.alert,
                        open: true,
                        msg: `${user?.name} ${translate('userIsBlocked')}`,
                      });
                    } else {
                      if (!isEmpty(msg?.trim())) {
                        const abuse = absWords.some(item =>
                          msg.toLowerCase().includes(item),
                        );
                        if (abuse) {
                          setBottomModal({
                            type: modType?.alert,
                            open: true,
                            msg: translate('abusiveWordAlert'),
                          });
                        } else {
                          handleSend(msg);
                        }
                        setMsg('');
                      } else {
                        if (Platform.OS === 'ios') {
                          startRecordiOS();
                        } else {
                          handleStartRecord();
                        }
                      }
                    }
                  }}
                >
                  <Icon2
                    name={mic ? 'mic' : 'ios-send'}
                    size={green ? 20 : 17}
                    color={BaseColors.white}
                  />
                </TouchableOpacity>
              </View>
            )}

            {recordAccess && (
              <View
                style={{
                  height: 110,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    style={{
                      position: 'absolute',
                      height: 30,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      top: 0,
                      paddingTop: 5,
                      zIndex: 500,
                      backgroundColor: BaseColors.white,
                    }}
                  >
                    {formatTime(timeRemaining)}
                  </Text>
                  <Pressable
                    style={{
                      height: 50,
                      width: 50,
                      borderColor: BaseColors.primary,
                      borderWidth: 1,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 20,
                    }}
                    onPress={() => handleStopRecord()}
                  >
                    <Icon2
                      name={'close'}
                      size={25}
                      color={BaseColors.primary}
                    />
                  </Pressable>
                  <Lottie
                    source={Images.micAnim}
                    style={{
                      height: 90,
                      width: 90,
                    }}
                    autoPlay
                    loop
                  />
                  <Pressable
                    style={{
                      height: 50,
                      width: 50,
                      borderColor: BaseColors.primary,
                      borderWidth: 1,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 20,
                    }}
                    onPress={() => handleVoiceSend()}
                  >
                    <Icon2
                      name={'ios-send'}
                      size={25}
                      color={BaseColors.primary}
                    />
                  </Pressable>
                </View>
              </View>
            )}
            {Platform.OS === 'android' && (
              <AudioSetup
                ref={classComponentRef}
                onPlaybackComplete={handlePlaybackComplete}
              />
            )}
          </View>
        </>
      )}

      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : null}
        style={{ flex: EmojiOpen ? 1 : null }}
      >
        <EmojiPicker
          onEmojiSelected={HandleEmoji}
          open={EmojiOpen}
          onClose={() => setEmojiOpen(false)}
          enableRecentlyUsed
          enableSearchBar
          allowMultipleSelections
          hideHeader
          theme={styles.EmojiBoardTheme}
          enableCategoryChangeGesture={false}
          categoryPosition="bottom"
        />
      </KeyboardAvoidingView>

      {bottomModal?.open && (
        <CModal
          visible={bottomModal?.open}
          onPressOverlay={() =>
            setBottomModal({
              type: '',
              open: false,
              msg: '',
            })
          }
          onRequestClose={() =>
            setBottomModal({
              type: '',
              open: false,
              msg: '',
            })
          }
          modalType="bottom"
          modalStyle={styles.modalStyle}
        >
          {bottomModal?.type === modType?.alert && <SubscriptionAlert />}
          {bottomModal?.type === modType?.block && <BlockUser />}
          {bottomModal?.type === modType?.deletChat && <DeleteChatHistory />}
        </CModal>
      )}

      {imageModal?.open && (
        <ViewImageModal
          visible={imageModal.open}
          handleModal={() => {
            setImageModal({ open: false, url: '' });
          }}
          imgUrl={imageModal?.url}
        />
      )}
    </View>
  );
};
