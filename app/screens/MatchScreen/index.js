import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import Lottie from 'lottie-react-native';
import Button from '@components/Button';
import CModal from '@components/CModal';
import { Images } from '@config';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import { isNull } from 'lodash';
import translate from '../../lang/lang/Translate';
const MatchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { setMatch } = Authentication;
  const uId = route?.params?.from;
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [percentage, setPercentage] = useState();
  const [personOne, setPersonOne] = useState();
  const [personTwo, setPersonTwo] = useState();
  const [chatData, setChatData] = useState();
  useEffect(() => {
    getMatch();
  }, []);
  async function getMatch() {
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.matchDetails}?user_id=${uId}`,
        'GET',
      );

      console.log('response =======>>>', response);
      if (response.status) {
        setMessage(response?.data?.message);
        setPercentage(response?.data?.match_percentage);
        setPersonOne(response?.data?.person_one_image);
        setPersonTwo(response?.data?.person_two_image);
        setChatData(response?.data?.chat_data);
      }
    } catch (error) {
      console.log('error ===>>>', error);

      Toast.show({
        type: 'error',
        text1: error?.toString(),
      });
    }
  }

  const getHome = () => {
    dispatch(setMatch(true));
    navigation.navigate('Home');
  };
  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        <View style={style.imgcontainer1}>
          <Image
            style={style.profileimage}
            source={isNull(personOne) ? Images.blankImage : { uri: personOne }}
            resizeMode="cover"
          />

          <Image
            style={style.profileimage2}
            source={isNull(personTwo) ? Images.blankImage : { uri: personTwo }}
            resizeMode="cover"
          />
          <Image
            source={Images.Vector}
            style={style.realHeart}
            resizeMode="cover"
          />
          <Image
            source={Images.realHeart}
            style={style.realHeart}
            resizeMode="cover"
          />
          <Image
            source={Images.darkHeart}
            style={style.darkHeart}
            resizeMode="cover"
          />
          <Image
            source={Images.Heart}
            style={style.redHeart}
            resizeMode="cover"
          />
          <Image
            source={Images.loveChat}
            style={style.loveChat}
            resizeMode="cover"
          />
          <Image
            source={Images.blackHeart}
            style={style.blackHeart}
            resizeMode="cover"
          />
          <View style={style.percentage}>
            <Text style={style.percentagetext}>{percentage}%</Text>
          </View>
          <Image
            source={Images.smileHeart}
            style={style.smileHeart}
            resizeMode="cover"
          />
          <View style={style.matchcontainer}>
            <Text style={style.matchTxt}>{translate('itsMatch')}</Text>
          </View>

          <View>
            <Text style={style.subtitle}>{message}</Text>
          </View>
        </View>
        <View style={style.buttoncontainer1}>
          <Button
            title={translate('match1')}
            onPress={() => {
              navigation.navigate('ChatScreen', {
                chatDetails: chatData,
              });
            }}
            style={{ marginHorizontal: 50, marginBottom: 20 }}
          />

          <Button
            title={translate('match2')}
            type="outlined"
            style={{ marginHorizontal: 50 }}
            onPress={() => getHome()}
          />
        </View>
        <CModal
          visible={visible}
          onPressOverlay={() => {
            setVisible(false);
          }}
        >
          <View style={style.modalcontainer1}>
            <Image
              source={Images.logo}
              style={style.logoimage}
              resizeMode="cover"
            />

            <Text style={style.subtitleintext}>
              You have received all the match proposals for today
            </Text>
          </View>
        </CModal>
      </View>
      <Lottie
        style={{ zIndex: 0 }}
        speed={1}
        autoPlay
        source={require('../../assets/lottieFiles/hearts.json')}
      />
    </View>
  );
};

export default MatchScreen;
