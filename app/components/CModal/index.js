import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const CModal = props => {
  const {
    children,
    visible = false,
    onRequestClose = () => {},
    overLayStyle = () => {},
    modalStyle,
    onPressOverlay = () => {},
    modalType = 'center',
  } = props;

  let typeStyle = null;
  let MStyle = null;

  switch (modalType) {
    case 'top':
      typeStyle = styles.modalMainViewTop;
      MStyle = styles.modalViewTop;
      break;
    case 'bottom':
      typeStyle = styles.modalMainViewBottom;
      MStyle = styles.modalViewBottom;
      break;

    default:
      typeStyle = null;
      MStyle = null;
      break;
  }
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={onRequestClose}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={onPressOverlay}>
          <View style={[styles.modalMainView, typeStyle, overLayStyle]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.modalView, MStyle, modalStyle]}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {children}
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CModal;
