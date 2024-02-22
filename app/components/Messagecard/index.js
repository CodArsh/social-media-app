import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { isEmpty } from 'lodash';
import BaseSetting from '@config/setting';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { BaseColors } from '@config/theme';
import { Images } from '@config';
import translate from '../../lang/lang/Translate';
import Loader from '@components/Loader/Loader';

const MessageCard = ({
  title,
  newTagCenter,
  newTagRight,
  timeDateText,
  countTxt,
  message,
  image,
  age,
  containerStyle,
  onPress,
  onlineDot,
  date,
  onLongPress,
}) => {
  const [imgLoader, setImgLoader] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={BaseSetting.buttonOpacity}
      style={[styles.Main, containerStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.imgBox}>
        {imgLoader && (
          <View style={styles.imgLoader}>
            <Loader style={{ height: 30, width: 30 }} />
          </View>
        )}
        <Image
          source={
            image
              ? {
                  uri: image,
                }
              : Images.blankImage
          }
          style={styles.Img}
          onLoadStart={() => setImgLoader(true)}
          onLoadEnd={() => setImgLoader(false)}
        />
        {onlineDot && <View style={styles.GreenDot} />}
      </View>

      <View style={styles.contentBox}>
        <View style={styles.row}>
          <View style={styles.titleAgeCon}>
            {!isEmpty(title) && (
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
                {!isEmpty(age) && ', ' + age}
              </Text>
            )}
            {newTagCenter && (
              <View style={styles.NewBox}>
                <View style={styles.NewTag}>
                  <Text style={styles.NewTagText}>{translate('new')}</Text>
                </View>
              </View>
            )}
          </View>
          {!isEmpty(timeDateText) && (
            <View style={styles.rightCon}>
              <Text style={styles.timeDateText}>{timeDateText}</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          {!isEmpty(date) && (
            <View style={styles.iconTextCon}>
              <Icon name="calendar" size={15} color={BaseColors.primary} />
              <Text style={styles.TextSec}>{date}</Text>
            </View>
          )}
          <View style={styles.messageCon}>
            {!isEmpty(message) && (
              <Text style={styles.MsgText} numberOfLines={1}>
                {message}
              </Text>
            )}
          </View>
          {newTagRight ||
            (!isEmpty(countTxt) && (
              <View style={styles.rightCon}>
                {newTagRight && (
                  <View style={styles.NewTag}>
                    <Text style={styles.NewTagText}>{translate('new')}</Text>
                  </View>
                )}
                {!isEmpty(countTxt) && (
                  <View style={styles.countDot}>
                    <Text style={styles.countTxt}>{countTxt}</Text>
                  </View>
                )}
              </View>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

MessageCard.propTypes = {
  title: PropTypes.string,
  newTagCenter: PropTypes.bool,
  newTagRight: PropTypes.bool,
  timeDateText: PropTypes.string,
  countTxt: PropTypes.string,
  message: PropTypes.string,
  image: PropTypes.string,
  age: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  onlineDot: PropTypes.bool,
  date: PropTypes.string,
};
MessageCard.defaultProps = {
  title: '',
  newTagCenter: false,
  newTagRight: false,
  timeDateText: '',
  countTxt: '',
  message: '',
  image: '',
  age: '',
  containerStyle: {},
  onPress: () => {},
  onLongPress: () => {},
  onlineDot: false,
  date: '',
};
