import { BaseColors, FontFamily } from '@config/theme';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '@config';
import translate from '../../lang/lang/Translate';

const CCallNotificalModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({}));
  const {
    onRecive,
    onCancel,
    incomingName,
    incomingType,
    callModalVissible,
    profileImage,
  } = props;

  return (
    <Modal transparent animationType="slide" visible={callModalVissible}>
      <View style={styles.mainViewModal}>
        <View style={[styles.containerf, { paddingTop: 30 }]}>
          <Text
            style={[
              {
                fontSize: 30,
                fontFamily: FontFamily.medium,
                color: BaseColors.secondary,
              },
            ]}
          >
            {incomingName}
          </Text>
          <Image
            style={styles.image}
            source={profileImage ? { uri: profileImage } : Images.logo}
          />

          <Text
            style={{
              color: BaseColors.primary,
              fontFamily: FontFamily.medium,
              marginBottom: 20,
            }}
          >
            {`${incomingType} Calling...`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                onCancel();
              }}
              style={[
                styles.btnView,
                { backgroundColor: BaseColors.red, marginEnd: 5 },
              ]}
            >
              <Text
                style={{
                  color: BaseColors.white,
                  fontFamily: FontFamily.medium,
                }}
              >
                {translate('Hang-up')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onRecive();
              }}
              style={[
                styles.btnView,
                { backgroundColor: BaseColors.limeGreen, marginStart: 4 },
              ]}
            >
              <Text
                style={{
                  color: BaseColors.white,
                  fontFamily: FontFamily.medium,
                }}
              >
                {translate('Receive')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalIcon}>
            <Icon name={'phone-call'} size={25} color={BaseColors.primary} />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default CCallNotificalModal;
