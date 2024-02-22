import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    flexDirection: 'column',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BaseColors.primary,
    marginRight: 10,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColors.primary,
    marginRight: 10,
  },
  radioButtonText: {
    color: BaseColors.secondary,
    fontSize: 16,
    fontWeight: 'normal',
  },
  otherInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: BaseColors.black30,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: 'normal',
    color: BaseColors.primary,
  },
});
