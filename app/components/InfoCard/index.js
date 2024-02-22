import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import PropTypes from 'prop-types';
import SChip from '@components/SChip';
import Icon from 'react-native-vector-icons/Feather';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import translate from '../../lang/lang/Translate';
import { isEmpty } from 'lodash';
import { Images } from '@config';
import Loader from '@components/Loader/Loader';
import NewUser from '@components/NewUser';

// this is for LikesYouScreen created by Sahil ahmed on Feb 12
const InfoCard = ({
  title,
  Img,
  location,
  is_new,
  date,
  avatarData,
  onPress,
  style,
  onButtonPress,
  chipText,
  joinBtn,
  chipLeftIcon,
  chipStyle,
  chipTextStyle,
  chipType,
  age,
  userCount,
  btnType,
  btnText,
  titleStyle,
  imgConStyle,
  BtnLoading,
  unMatch,
}) => {
  const [imgLoader, setImgLoader] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={BaseSetting.buttonOpacity}
      style={[
        styles.MainContainer,
        style,
        {
          borderRadius: unMatch ? 0 : 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      ]}
    >
      <View style={[styles.imgContainer, imgConStyle]}>
        {imgLoader && (
          <View style={styles.imgLoader}>
            <Loader small />
          </View>
        )}

        <Image
          style={styles.Image}
          resizeMode="cover"
          source={
            Img
              ? {
                  uri: Img,
                }
              : Images.blankImage
          }
          onLoadStart={() => setImgLoader(true)}
          onLoadEnd={() => setImgLoader(false)}
        />
        {!isEmpty(chipText) && (
          <SChip
            text={chipText}
            shape="round"
            chipStyle={chipStyle}
            TextStyle={chipTextStyle}
            leftIcon={chipLeftIcon}
            type={chipType}
          />
        )}
      </View>

      <View style={styles.InfoCon}>
        <View style={styles.information}>
          {!isEmpty(title) && (
            <View style={styles.titleCon}>
              <Text style={[styles.PText, titleStyle]}>{title}</Text>
              {is_new && <NewUser />}
              {!isEmpty(age) && <View style={styles.Dot} />}
              {!isEmpty(age) && <Text style={styles.PText}>{age}</Text>}
            </View>
          )}

          <View style={styles.DateLocateCon}>
            {!isEmpty(location) && (
              <View style={styles.iconTextCon}>
                <Icon name="map-pin" size={15} color={BaseColors.primary} />
                <Text style={styles.TextSec}>{location}</Text>
              </View>
            )}
            {!isEmpty(date) && (
              <View style={styles.iconTextCon}>
                <Icon name="calendar" size={15} color={BaseColors.primary} />
                <Text style={styles.TextSec}>{date}</Text>
              </View>
            )}
          </View>
        </View>
        {joinBtn && (
          <View style={styles.BtnCon}>
            <Button
              type={btnType}
              loading={BtnLoading}
              title={btnText}
              TextStyle={{ fontSize: 13 }}
              onPress={onButtonPress}
            />
          </View>
        )}
      </View>

      {!isEmpty(avatarData) && (
        <View style={styles.avatarCon}>
          {avatarData.map((item, index) => {
            if (index === 0 || index === 1) {
              return (
                <View style={styles.avatar} key={item?.user_id}>
                  <Image
                    source={{ uri: item?.profile_photo }}
                    resizeMode="cover"
                    style={[styles.Image]}
                  />
                </View>
              );
            }
          })}
          <Text style={styles.avText}>
            {userCount} {translate('userJoined')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  Img: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  userData: PropTypes.array,
  onPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  joinBtn: PropTypes.bool,
  age: PropTypes.string,
  userCount: PropTypes.string,
  is_new: PropTypes.string,
};
InfoCard.defaultProps = {
  title: '',
  Img: '',
  location: '',
  date: '',
  userData: [],
  onPress: () => {},
  onButtonPress: () => {},
  joinBtn: false,
  is_new: false,
  age: '',
  userCount: '',
};
