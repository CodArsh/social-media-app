import { StyleSheet, Dimensions } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  mainViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.black50,
  },
  containerf: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: Dimensions.get('window').width / 1.2,
  },
  btnView: {
    flex: 1,
    backgroundColor: BaseColors.primary,
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    margin: 8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalIcon: {
    position: 'absolute',
    backgroundColor: BaseColors.white,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: -22,
    // borderWidth: 1,
    // borderColor: BaseColors.primary,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 65,
    margin: 16,
  },
});
