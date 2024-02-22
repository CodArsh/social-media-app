/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Platform, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Loader from '@components/Loader/Loader';

export default function ViewImageModal(props) {
  const [imgLoader, setImgLoader] = useState(false);
  const { visible = false, handleModal = () => null, imgUrl = '' } = props;
  const IOS = Platform.OS === 'ios';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        handleModal();
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => {
          handleModal();
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalView}
          onPress={() => {
            return null;
          }}
        >
          <FIcon
            name="close"
            size={26}
            onPress={() => {
              handleModal();
            }}
            style={{
              position: 'absolute',
              top: IOS ? getStatusBarHeight() + 6 : 15,
              left: 12,
              zIndex: 30,
              color: '#FFF',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {imgLoader && (
              <View style={styles.imgLoader}>
                <Loader style={{ height: 70, width: 70 }} />
              </View>
            )}
            <Image
              source={{
                uri: imgUrl,
              }}
              style={{
                flex: 1,
                resizeMode: 'contain',
              }}
              resizeMode="contain"
              onLoadStart={() => setImgLoader(true)}
              onLoadEnd={() => setImgLoader(false)}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
