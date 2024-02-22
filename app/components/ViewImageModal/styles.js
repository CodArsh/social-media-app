import { BaseColors } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: BaseColors.black,
    paddingTop: 20,
    width: '100%',
    maxHeight: '100%',
    height: '100%',
  },

  imgLoader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 20,
    borderWidth: 5,
  },
});
