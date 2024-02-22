import { StyleSheet, Dimensions } from 'react-native';
import {BaseColors} from '@config/theme';

export default StyleSheet.create({
  animationWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 350,
    width: 200,
  },
  mainViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.transparentBackModal,
  },
  containerf: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.white,
    borderRadius: 10,
    width: Dimensions.get('window').width / 1.2,
    padding: 20
  },
  offlineTitle: {
    color: BaseColors.greyColor,
    textAlign: 'center',
  },
  offlineSubtxt: {
    color: BaseColors.greyColor,
    marginTop: 5,
    textAlign: 'center',
  },
});
