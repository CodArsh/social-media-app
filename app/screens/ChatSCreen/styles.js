import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const IOS = Platform.OS === 'ios';
export const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerMain: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: IOS ? 50 : 20,
  },
  messageContainer: {
    marginVertical: 5,
    borderRadius: 7,
  },
  containerLeft: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: BaseColors.secondary,
  },
  containerRight: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    backgroundColor: BaseColors.primary,
  },
  imgBox: {
    backgroundColor: BaseColors.white,
    padding: 4,
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
  },
  img: {
    height: 28,
    width: 28,
    borderRadius: 5,
  },
  textBox: {
    maxWidth: BaseSetting.nWidth * 0.5,
    padding: 7,
  },
  messageText: {
    fontFamily: FontFamily.medium,
    color: BaseColors.black,
  },
  chatInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: BaseColors.black50,
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  emoji: {
    marginRight: 10,
    marginLeft: 3,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    maxHeight: BaseSetting.nHeight * 0.1,
    margin: 0,
    padding: 0,
    color: BaseColors.primary,
    paddingRight: 5,
    marginVertical: 5,
    overflow: 'hidden',
    fontFamily: FontFamily.regular,
  },
  sendBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  EmojiBoardTheme: {
    container: BaseColors.white,
    knob: BaseColors.primary,
    category: {
      icon: BaseColors.secondary,
      iconActive: BaseColors.white,
      container: BaseColors.white,
      containerActive: BaseColors.primary,
    },
    search: {
      text: BaseColors.secondary,
      icon: BaseColors.secondary,
    },
  },

  // modal style
  title: {
    color: BaseColors.labelColor,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  text: {
    color: BaseColors.labelColor,
    fontFamily: FontFamily.medium,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  chatTextContainer: {
    marginVertical: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderColor: BaseColors.primary,
    borderWidth: 1,
    borderRadius: 7,
  },
  centerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  chatContainer: {
    flex: 1,
    marginVertical: 4,
  },
  chatAvotar: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  imgLogo: {
    width: 120,
    height: 120,
  },
  chatImage: {
    height: 35.18,
    width: 35.31,
  },
  chatTree: {
    width: 40,
    height: 55,
    position: 'absolute',
    left: -25,
    bottom: 40,
    zIndex: -1,
  },
  squareFrameContainer: {
    height: 78.55,
    width: 90,
  },
  traingleImage: {
    height: 17,
    width: 17,
    right: -15,
    bottom: 30,
    position: 'absolute',
  },
  chatTree2: {
    width: 42,
    height: 68,
    position: 'absolute',
    right: -30,
    bottom: 46,
    zIndex: -1,
  },
  chatLogo: {
    height: 26,
    width: 67,
  },
  icon: {
    height: 9,
    width: 21,
  },
  line: {
    marginBottom: 2,
  },
  dot: {
    marginRight: 3,
  },
  frameContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  frameContainer2: {
    marginTop: 40,
    marginRight: 10,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginTop: 60,
    right: 50,
  },
  textContainer: {
    alignItems: 'center',
    // marginTop: 30,
  },
  chatMsgBack: {
    borderRadius: 5,
    alignItems: 'flex-start',
    maxWidth: Dimensions.get('screen').width / 2,
    paddingBottom: 10,
  },
  crossContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientCircle: {
    flex: 0,
    padding: 5,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  modalView: {
    backgroundColor: BaseColors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: BaseColors.white,
    height: Dimensions.get('window').height / 2.1,
  },
  modalView1: {
    backgroundColor: BaseColors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: BaseColors.white,
    height: Dimensions.get('window').height / 1.7,
  },
  row: {
    borderRadius: 20,
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCon: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  Img: {
    height: 20,
    width: 35,
  },
  headerTextCon: {
    flex: 1,
    marginLeft: 8,
  },
  headerTextCenter: {
    left: 0,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FontFamily.bold,
    color: BaseColors.secondary,
    textTransform: 'capitalize',
    fontSize: 18,
  },
  deleteImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  topTitle: {
    color: BaseColors.secondary,
    fontSize: 20,
    fontFamily: FontFamily.medium,
    marginBottom: 10,
  },
  desc: {
    color: BaseColors.secondary,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  btnStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 25,
  },
  btnIn: { paddingHorizontal: 15, width: 150 },
  modalStyle: {
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  headerIconCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundBtnCon: {
    height: 28,
    width: 28,
    borderWidth: 1,
    borderColor: BaseColors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modelTxt: {
    textAlign: 'center',
    color: BaseColors.textGrey,
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: FontFamily.regular,
  },
  modalRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  paperclipStyle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    marginHorizontal: 10,
    borderRadius: 50,
  },
  sendContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  iceBreackerHead: {
    fontFamily: FontFamily.bold,
    color: BaseColors.primary,
    fontSize: 20,
    marginBottom: 20,
  },
  iceBreacker: {
    fontFamily: FontFamily.medium,
    color: BaseColors.textGrey,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.black20,
    zIndex: 2000,
  },
  popupTabs: {
    width: '100%',
    borderColor: BaseColors.black30,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  docBox: {
    position: 'absolute',
    bottom: 50,
    right: 15,
    backgroundColor: BaseColors.white,
    zIndex: 5000,
    width: BaseSetting.nWidth * 0.45,
    borderColor: BaseColors.black30,
    borderWidth: 1,
    borderRadius: 20,
    borderBottomEndRadius: 0,
  },
  popup: {
    backgroundColor: BaseColors.white,
    position: 'absolute',
    width: BaseSetting.nWidth / 1.7,
    top: IOS ? 85 : 60,
    right: 20,
    zIndex: 5000,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopEndRadius: 0,
  },
  popupText: {
    color: BaseColors.secondary,
    marginVertical: 6,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  typingText: {
    fontFamily: FontFamily.medium,
    color: BaseColors.primary,
    marginLeft: 5,
  },
  dateTimeCon: {
    backgroundColor: BaseColors.black10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginVertical: 15,
    alignSelf: 'center',
  },
  dateTimeText: {
    color: BaseColors.black50,
    fontFamily: FontFamily.medium,
    fontSize: 10,
  },
  AbuseAlertTitle: {
    color: BaseColors.alertRed,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
  },
  playPause: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
