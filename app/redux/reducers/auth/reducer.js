import types from './actions';

const initialState = {
  userData: {},
  rememberData: [],
  accessToken: '',
  userType: '', // user type 'Customer' || 'ServiceProvider'
  introScreens: true,
  askLocationPermission: false,
  baseColor: {},
  darkmode: false,
  activeScreen: '',
  currentLocation: {},
  profileSetup: 0,
  profileData: {},
  newMissionData: {},
  askPermission: false,
  activeChatUser: null,
  callStatus: {},
  userPhotos: [],
  fcmToken: '',
  isSubscribed: false,
  subscriptionDetails: {},
  notification: [],
  video: {},
  currentRoom: false,
  isConnected: true,
  badge: false,
  screen: '',
  newlist: '',
  match: false,
  emptyProfile: {
    profile: false,
    character: false,
    interest: false,
    preference: false,
  },
  newMsg: false,
  activeProfileObj: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      if (
        action.payload &&
        action.payload.auth &&
        action.payload.auth.introShown
      ) {
        return {
          ...state,
          ...action.payload.auth,
          introShown: false,
        };
      }
      return state;
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };
    case types.SET_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SET_USERTYPE:
      return {
        ...state,
        userType: action.userType,
      };
    case types.SET_INTRO:
      return {
        ...state,
        introScreens: action.introScreens,
      };
    case types.SET_PROFILESETUP:
      return {
        ...state,
        profileSetup: action.profileSetup,
      };
    case types.SET_PROFILEDATA:
      return {
        ...state,
        profileData: action.profileData,
      };
    case types.SET_NEWMISSIONDATA:
      return {
        ...state,
        newMissionData: action.newMissionData,
      };
    case types.LOGOUT:
      return {
        ...state,
        userData: {},
        accessToken: '',
        userType: '',
        coins: 0,
      };
    case types.SET_LOCATION_PERMISSION:
      return {
        ...state,
        askLocationPermission: action.askLocationPermission,
      };
    case types.SET_BASECOLOR:
      return {
        ...state,
        baseColor: action.baseColor,
      };
    case types.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };
    case types.SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.activeScreen,
      };
    case types.SET_ASK_PERMISSION:
      return {
        ...state,
        askPermission: action.askPermission,
      };
    case types.SET_ACTIVE_CHAT_USER:
      return {
        ...state,
        activeChatUser: action.activeChatUser,
      };
    case types.SET_CALL_STATUS:
      return {
        ...state,
        callStatus: action.callStatus,
      };
    case types.SET_SUBSCRIBE:
      return {
        ...state,
        isSubscribed: action.isSubscribed,
      };

    case types.SET_SUBSCRIPTION_DETAILS:
      return {
        ...state,
        subscriptionDetails: action.subscriptionDetails,
      };
    case types.SET_USER_PHOTOS:
      return {
        ...state,
        userPhotos: action.userPhotos,
      };
    case types.SET_FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.fcmToken,
      };
    case types.REMEMBER_DATA:
      return {
        ...state,
        rememberData: action.rememberData,
      };
    case types.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.notification,
      };
    case types.SET_VIDEO:
      return {
        ...state,
        video: action.video,
      };
    case types.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.currentRoom,
      };
    case types.SET_NETWORK_STATUS:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    case types.SET_BADGE:
      return {
        ...state,
        badge: action.badge,
      };
    case types.SET_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
    case types.SET_NEW_LIST:
      return {
        ...state,
        newlist: action.newlist,
      };
    case types.SET_MATCH:
      return {
        ...state,
        match: action.match,
      };
    case types.SET_EMPTY_PROFILE:
      return {
        ...state,
        emptyProfile: action.profileObj,
      };
    case types.SET_NEW_MSG:
      return {
        ...state,
        newMsg: action.newMsg,
      };
    case types.SET_ACTIVE_PROFILE:
      return {
        ...state,
        activeProfileObj: action.activeProfileObj,
      };
    default:
      return state;
  }
}
