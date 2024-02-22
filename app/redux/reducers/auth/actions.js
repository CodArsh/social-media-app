const actions = {
  SET_USER_DATA: 'auth/SET_USER_DATA',
  REMEMBER_DATA: 'auth/REMEMBER_DATA',
  SET_ACCESSTOKEN: 'auth/SET_ACCESSTOKEN',
  SET_INTRO: 'auth/SET_INTRO',
  SET_PROFILESETUP: 'auth/SET_PROFILESETUP',
  SET_PROFILEDATA: 'auth/SET_PROFILEDATA',
  SET_NEWMISSIONDATA: 'auth/SET_NEWMISSIONDATA',
  LOGOUT: 'auth/LOGOUT',
  SET_LOCATION_PERMISSION: 'auth/SET_LOCATION_PERMISSION',
  SET_USERTYPE: 'auth/SET_USERTYPE',
  SET_DARKMODE: 'auth/SET_DARKMODE',
  SET_BASECOLOR: 'auth/SET_BASECOLOR',
  SET_ACTIVE_SCREEN: 'SET_ACTIVE_SCREEN',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_ASK_PERMISSION: 'SET_ASK_PERMISSION',
  SET_ACTIVE_CHAT_USER: 'SET_ACTIVE_CHAT_USER',
  SET_CALL_STATUS: 'auth/SET_CALL_STATUS',
  SET_USER_PHOTOS: 'SET_USER_PHOTOS',
  SET_SUBSCRIBE: 'auth/SET_SUBSCRIBE',
  SET_SUBSCRIPTION_DETAILS: 'auth/SET_SUBSCRIPTION_DETAILS',
  SET_FCM_TOKEN: 'SET_FCM_TOKEN',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_VIDEO: 'SET_VIDEO',
  SET_CURRENT_ROOM: 'auth/SET_CURRENT_ROOM',
  SET_NETWORK_STATUS: 'auth/SET_NETWORK_STATUS',
  SET_BADGE: 'auth/SET_BADGE',
  SET_SCREEN: 'auth/SET_SCREEN',
  SET_NEW_LIST: 'auth/SET_NEW_LIST',
  SET_MATCH: 'auth/SET_MATCH',
  SET_EMPTY_PROFILE: 'auth/SET_EMPTY_PROFILE',
  SET_NEW_MSG: 'SET_NEW_MSG',
  SET_ACTIVE_PROFILE: 'SET_ACTIVE_PROFILE',

  setUserData: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_USER_DATA,
        userData: data,
      });
  },
  setRememberData: rememberData => dispatch =>
    dispatch({
      type: actions.REMEMBER_DATA,
      rememberData,
    }),
  setUserCurrentLocation: currentLocation => {
    return dispatch =>
      dispatch({
        type: actions.SET_CURRENT_LOCATION,
        currentLocation: currentLocation,
      });
  },

  setAccessToken: accessToken => dispatch =>
    dispatch({
      type: actions.SET_ACCESSTOKEN,
      accessToken,
    }),

  setUserType: userType => dispatch =>
    dispatch({
      type: actions.SET_USERTYPE,
      userType,
    }),

  setIntro: introScreens => dispatch =>
    dispatch({
      type: actions.SET_INTRO,
      introScreens,
    }),

  setProfileSetup: profileSetup => dispatch =>
    dispatch({
      type: actions.SET_PROFILESETUP,
      profileSetup,
    }),

  setProfileData: profileData => dispatch =>
    dispatch({
      type: actions.SET_PROFILEDATA,
      profileData,
    }),

  setNewMissionData: newMissionData => dispatch =>
    dispatch({
      type: actions.SET_NEWMISSIONDATA,
      newMissionData,
    }),

  setIsSubscribe: isSubscribed => dispatch =>
    dispatch({
      type: actions.SET_SUBSCRIBE,
      isSubscribed,
    }),

  setSubscriptionDetails: subscriptionDetails => dispatch =>
    dispatch({
      type: actions.SET_SUBSCRIPTION_DETAILS,
      subscriptionDetails,
    }),

  logOut: () => (dispatch, getState) => {
    // const IOSocket = getState().socket.IOSocket;
    // if (IOSocket) {
    //   IOSocket.disconnect();
    //   dispatch(socketActions.disconnectCall());
    //   dispatch(socketActions.clearChatData());
    // }
    dispatch({
      type: actions.LOGOUT,
    });
  },

  setLocationPermission: askLocationPermission => dispatch =>
    dispatch({
      type: actions.SET_LOCATION_PERMISSION,
      askLocationPermission,
    }),
  setBaseColor: baseColor => dispatch =>
    dispatch({
      type: actions.SET_BASECOLOR,
      baseColor,
    }),

  setDarkmode: darkmode => dispatch =>
    dispatch({
      type: actions.SET_DARKMODE,
      darkmode,
    }),
  setActiveScreen: activeScreen => dispatch =>
    dispatch({
      type: actions.SET_ACTIVE_SCREEN,
      activeScreen,
    }),
  setAskPermission: askPermission => dispatch =>
    dispatch({
      type: actions.SET_ASK_PERMISSION,
      askPermission,
    }),
  setActiveChatUser: activeChatUser => dispatch =>
    dispatch({
      type: actions.SET_ACTIVE_CHAT_USER,
      activeChatUser,
    }),
  setCallStatus: callStatus => dispatch =>
    dispatch({
      type: actions.SET_CALL_STATUS,
      callStatus,
    }),
  setUserPhotos: userPhotos => dispatch =>
    dispatch({
      type: actions.SET_USER_PHOTOS,
      userPhotos,
    }),
  setFcmToken: fcmToken => dispatch =>
    dispatch({
      type: actions.SET_FCM_TOKEN,
      fcmToken,
    }),
  setNotification: notification => dispatch =>
    dispatch({
      type: actions.SET_NOTIFICATION,
      notification,
    }),
  setVideo: video => dispatch =>
    dispatch({
      type: actions.SET_VIDEO,
      video,
    }),

  setCurrentRoom: currentRoom => dispatch =>
    dispatch({
      type: actions.SET_CURRENT_ROOM,
      currentRoom,
    }),

  setNetworkStatus: isConnected => dispatch =>
    dispatch({
      type: actions.SET_NETWORK_STATUS,
      isConnected,
    }),
  setBadge: badge => dispatch =>
    dispatch({
      type: actions.SET_BADGE,
      badge,
    }),
  setScreen: screen => dispatch =>
    dispatch({
      type: actions.SET_SCREEN,
      screen,
    }),
  setNewlist: newlist => dispatch =>
    dispatch({
      type: actions.SET_NEW_LIST,
      newlist,
    }),
  setMatch: match => dispatch =>
    dispatch({
      type: actions.SET_MATCH,
      match,
    }),
  setNewMsg: newMsg => dispatch =>
    dispatch({
      type: actions.SET_NEW_MSG,
      newMsg,
    }),
  setEmptyProfile: profileObj => dispatch =>
    dispatch({
      type: actions.SET_EMPTY_PROFILE,
      profileObj,
    }),
  setActiveProfile: activeProfileObj => dispatch =>
    dispatch({
      type: actions.SET_ACTIVE_PROFILE,
      activeProfileObj,
    }),
};

export default actions;
