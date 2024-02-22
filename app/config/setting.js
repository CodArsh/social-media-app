import { Dimensions } from 'react-native';
const devMode = __DEV__;
const socketURL = 'https://chat.dottie.be/';
const baseUrl = devMode
  ? 'http://192.168.1.44/dottie/v1/'
  : 'https://dottie.be/v1/';

const BaseSetting = {
  name: 'dottie',
  displayName: 'dottie',
  appVersionCode: '1',
  stripeKey:
    'pk_live_51MjhtNIOCXwVIdyZZF32xYZnDlzPNmXEoVpL9nmgr8hhjlklkMTu51hITx6iNIc97oqoglWXFWOMErCkg6AUkOJ700RgJql9gR',
  // bugsnagApiKey: "",
  baseUrl,
  api: baseUrl,
  shareEndPoint: baseUrl,
  nWidth: Dimensions.get('window').width,
  nHeight: Dimensions.get('window').height,
  imgUrl: devMode ? 'http://192.168.0.124:8000' : 'https://dottie.be',
  timeOut: 30000,
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)/,
  buttonOpacity: 0.8,
  socketServer: socketURL,
  imageUpload: `${socketURL}upload-image`,
  endpoints: {
    login: 'user/login',
    commonList: 'common/characteristic-list',
    changePassword: 'user/change-password',
    forgotPassword: 'user/forgot-password',
    createProfile: 'user/sign-up',
    basicInfoView: 'user/basic-info-view',
    basicInfoUpdate: 'user/basic-info-update',
    countryList: 'common/country-list',
    faq: 'common/faq-list',
    contactDottie: 'contact-us/send',
    characterView: 'user/character-view',
    LangList: 'common/language-list',
    CharacterUpdate: 'user/character-update',
    interestView: 'user/interest-view',
    interestUpdate: 'user/interest-update',
    resetpassword: 'user/reset-password',
    cmsdetails: 'common/cms-detail',
    verifyEmail: 'user/verify-email',
    preferenceView: 'user/preference-view',
    preferenceUpdate: 'user/preference-update',
    preference: 'user/user-preferences',
    matches: 'user/daily-matches',
    visitorList: 'visitors/list',
    winkList: 'wink/list',
    blockedlist: 'user-blocked/blocked-list',
    favouriteList: 'favourite/favourite-list',
    userDetails: 'user/user-details',
    eventList: 'event/list',
    userJoined: 'event/joined-users',
    plans: 'subscription/list',
    photoDelete: 'user-photos/photo-delete',
    deleteAll: 'user-photos/delete-all',
    favouriteUser: 'favourite/favourite-user',
    blockUser: 'user-blocked/blocked-user',
    reportUser: 'report/report-user',
    favourite: 'favourite/favourite-user',
    visitors: 'visitors/visit-user',
    wink: 'wink/add',
    addPicture: 'user-photos/photo-create',
    addToken: 'user/add-token',
    addCard: 'payment/create-card',
    payment: 'payment/buy-subscription',
    deleteCard: 'payment/delete-card',
    cardList: 'payment/card-list',
    deleteAccount: 'user/delete-account',
    notificationList: 'notification/list',
    canclePlan: 'subscription/cancel-subscription',
    sendRequest: 'user-matches/send-request',
    userAccept: 'user-matches/accept-request',
    userReject: 'user-matches/reject-request',
    singleNotification: 'notification/delete-single',
    allNotifications: 'notification/delete-all',
    uploadImage: 'chat/upload-file',
    getCallStatus: 'chat/check-call-status',
    setCallStatus: 'chat/update-call-status',
    matchDetails: 'user-matches/match-details',
    onlineStatus: 'user/update-online-status',
    changLang: 'user/change-language',
    logOut: 'user/logout',
    sessionId: 'payment/create-session',
    updatePlan: 'payment/update-plan',
    userMatches: 'user-matches/matches-list',
    removeMatch: 'user-matches/remove-match',
    cancelRequest: 'user-matches/cancel-request',
    provinceList: 'common/province-list',
    cityList: 'common/city-list',
    deleteWink: 'wink/delete-wink',
    deleteVist: 'visitors/delete-visitor',
    deactivate: 'user/deactivate-account',
    reactivate: 'user/reactivate-account',
    checkNickname: 'user/check-nickname',
    checkEmail: 'user/check-email',
    planLanguage: 'subscription/current-plan',
    faqVideos: 'common/faq-videos',
    deleteChat: 'chat/delete-chat',
    resendEmail: 'user/resend-verification-email',
    splashData: 'user/splash-screen',
  },

  geolocationOptions: {
    enableHighAccuracy: false,
    timeout: 50000,
    maximumAge: 10000,
    distanceFilter: 1,
  },
  geoOptionHighAccurate: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 10000,
    distanceFilter: 1,
  },

  categoryId: {
    limitation: '2',
    hobby: '3',
    personality: '4',
    eyeColor: '5',
    hairColor: '6',
    movieGenre: '7',
    musicGenre: '8',
    drink: '9',
    relationShip: '10',
    religion: '11',
    abusiveWords: '12',
    gender: '13',
    orientation: '14',
    smoker: '15',
  },
};

export default BaseSetting;