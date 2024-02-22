// /* eslint-disable react-native/no-inline-styles */
// import { BaseColors, FontFamily } from '@config/theme';
// import React, {
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Image,
//   Platform,
// } from 'react-native';
// import InCallManager from 'react-native-incall-manager';
// import database from '@react-native-firebase/database';
// import {
//   RTCPeerConnection,
//   RTCView,
//   mediaDevices,
//   RTCIceCandidate,
//   RTCSessionDescription,
// } from 'react-native-webrtc';
// import { db } from '../utilities/firebase';
// import _ from 'lodash';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon2 from 'react-native-vector-icons/MaterialIcons';
// import { useSelector } from 'react-redux';
// import translate from '../lang/lang/Translate';

// const configuration = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const CallScreen = forwardRef((props, ref) => {
//   useImperativeHandle(ref, () => ({
//     onBackPress,
//   }));
//   const { isConnected, onHangUp, roomId, callDetails, callType } = props;

//   const auth = useSelector(state => state.auth);
//   const IOS = Platform.OS === 'ios';
//   const [localStream, setLocalStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();
//   const [cachedLocalPC, setCachedLocalPC] = useState();
//   const [callModal, setCallModal] = useState(false);

//   const [loader, setLoader] = useState(true);
//   const [toogleCaemraView, setToogleCaemraView] = useState(true);

//   const [isMuted, setIsMuted] = useState(false);
//   const [videoMuted, setVideoMuted] = useState(
//     callType === 'videoCall' ? false : true,
//   );

//   const onBackPress = () => {
//     localStream?.getTracks()?.forEach(track => track.stop());
//     if (cachedLocalPC) {
//       cachedLocalPC.removeStream(localStream);
//       cachedLocalPC.close();
//     }
//     if (remoteStream) {
//     }
//     setLocalStream();
//     setRemoteStream();
//     setCachedLocalPC();
//     onHangUp(true);
//     InCallManager.stop();
//     isConnected(false);

//     database().ref('/users').child(`/${auth.userData.id}`).update({
//       callingStatus: 'callEnd',
//       callingRoom: roomId,
//     });
//     database().ref('/users').child(`/${callDetails.user_id}`).update({
//       callingStatus: 'callEnd',
//       callingRoom: roomId,
//     });

//     db.collection('rooms').doc(roomId).delete();
//   };

//   useEffect(() => {
//     if (!videoMuted) {
//       InCallManager.stopRingtone();
//       InCallManager.setKeepScreenOn(true);
//       InCallManager.setForceSpeakerphoneOn(true);
//     } else {
//       InCallManager.stopRingtone();
//     }
//     isConnected(false);
//     setTimeout(() => {
//       startLocalStream();
//     }, 500);

//     return () => {
//       InCallManager.stopRingtone();
//       InCallManager.stop();
//     };
//   }, []);

//   // useEffect(() => {
//   //   toggleVideo();
//   // }, [appState]);

//   const startLocalStream = async () => {
//     // isFront will determine if the initial camera should face user or environment
//     const isFront = true;
//     const devices = await mediaDevices.enumerateDevices();
//     const facing = isFront ? 'front' : 'environment';
//     const videoSourceId = devices.find(
//       device => device.kind === 'videoinput' && device.facing === facing,
//     );
//     const facingMode = isFront ? 'user' : 'environment';
//     const constraints = {
//       audio: true,
//       video: !videoMuted
//         ? {
//             height: { min: 1024, ideal: 1280, max: 1920 },
//             width: { min: 576, ideal: 720, max: 1080 },
//             frameRate: 30,
//             facingMode,
//             optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
//           }
//         : false,
//     };
//     const newStream = await mediaDevices.getUserMedia(constraints);
//     setLocalStream(newStream);
//     setTimeout(() => {
//       setCallModal(true);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (callModal) {
//       setTimeout(() => {
//         startCall(roomId);
//       }, 1000);
//     }
//   }, [callModal]);

//   const startCall = async id => {
//     const localPC = new RTCPeerConnection(configuration);
//     localPC.addStream(localStream);
//     const roomRef = db.collection('rooms').doc(id);
//     const callerCandidatesCollection = roomRef.collection('callerCandidates');
//     localPC.onicecandidate = e => {
//       if (!e.candidate) {
//         return;
//       }
//       callerCandidatesCollection.add(e.candidate.toJSON());
//     };

//     localPC.onaddstream = e => {
//       if (e.stream && remoteStream !== e.stream) {
//         setRemoteStream(e.stream);
//       }
//     };

//     const offer = await localPC.createOffer({
//       offerToReceiveAudio: 1,
//       offerToReceiveVideo: 1,
//     });
//     await localPC.setLocalDescription(offer);

//     const roomWithOffer = { offer };
//     await roomRef.set(roomWithOffer);

//     roomRef.onSnapshot(async snapshot => {
//       const data = snapshot.data();

//       if (!localPC.currentRemoteDescription && data.answer) {
//         const rtcSessionDescription = new RTCSessionDescription(data.answer);
//         await localPC.setRemoteDescription(rtcSessionDescription);
//         setLoader(false);
//         InCallManager.stopRingback();
//       }
//     });

//     roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
//       if (!_.isNull(snapshot)) {
//         snapshot.docChanges().forEach(async change => {
//           if (change.type === 'added') {
//             let data = change.doc.data();
//             await localPC.addIceCandidate(new RTCIceCandidate(data));
//           }
//         });
//       }
//     });

//     setCachedLocalPC(localPC);
//   };

//   const switchCamera = () => {
//     localStream.getVideoTracks().forEach(track => track._switchCamera());
//   };

//   // Mutes the local's outgoing audio
//   const toggleMute = () => {
//     if (!remoteStream) {
//       return;
//     }
//     localStream.getAudioTracks().forEach(track => {
//       // console.log(track.enabled ? 'muting' : 'unmuting', 'local track', track);
//       track.enabled = !track.enabled;
//       setIsMuted(!track.enabled);
//     });
//   };

//   // Mutes the local's outgoing Video
//   const toggleVideo = () => {
//     if (!remoteStream) {
//       return;
//     }

//     localStream.getTracks().forEach(track => {
//       if (track.kind === 'video') {
//         track.enabled = !track.enabled;
//         setVideoMuted(!track.enabled);
//       }
//     });
//   };

//   const toogleCaemraViewFun = () => {
//     setToogleCaemraView(!toogleCaemraView);
//   };

//   return (
//     <>
//       {loader ? (
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}
//         >
//           <View
//             style={{
//               height: 120,
//               width: 120,
//               borderRadius: 120,
//             }}
//           >
//             <Image
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: 120,
//                 borderWidth: 2,
//                 borderColor: BaseColors.white,
//               }}
//               load={false}
//               resizeMode="cover"
//               source={{ uri: callDetails.profile_photo }}
//             />
//           </View>
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 50,
//             }}
//           >
//             <Text
//               style={{
//                 marginBottom: 2,
//                 fontSize: 32,
//                 color: BaseColors.secondary,
//                 fontFamily: FontFamily.medium,
//               }}
//             >
//               {callDetails?.name}
//             </Text>
//             <Text
//               style={{
//                 marginBottom: 24,
//                 fontSize: 12,
//                 fontWeight: 'normal',
//                 color: BaseColors.secondary,
//                 fontFamily: FontFamily.medium,
//               }}
//             >
//               {translate('Connecting')}
//             </Text>
//           </View>
//         </View>
//       ) : videoMuted ? (
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 0.8,
//             // marginTop: 120,
//           }}
//         >
//           <View
//             style={{
//               height: 120,
//               width: 120,
//               borderRadius: 120,
//             }}
//           >
//             <Image
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: 120,
//                 borderWidth: 2,
//                 borderColor: BaseColors.white,
//               }}
//               load={false}
//               resizeMode="cover"
//               source={{ uri: callDetails?.profile_photo }}
//             />
//           </View>
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 50,
//             }}
//           >
//             <Text
//               style={{
//                 marginBottom: 16,
//                 fontSize: 32,
//                 color: BaseColors.secondary,
//                 fontFamily: FontFamily.medium,
//               }}
//             >
//               {callDetails?.name}
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={{ flex: 1, marginBottom: 20, marginTop: IOS ? 50 : 10 }}>
//           <TouchableOpacity style={styles.rtcview}>
//             {remoteStream && (
//               <RTCView
//                 style={styles.rtc}
//                 streamURL={
//                   toogleCaemraView
//                     ? remoteStream && remoteStream.toURL()
//                     : localStream && localStream.toURL()
//                 }
//                 mirror
//                 objectFit="cover"
//               />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               toogleCaemraViewFun();
//             }}
//             style={styles.rtcviewR}
//           >
//             {remoteStream && (
//               <RTCView
//                 style={styles.rtcR}
//                 streamURL={
//                   toogleCaemraView
//                     ? localStream && localStream.toURL()
//                     : remoteStream && remoteStream.toURL()
//                 }
//                 mirror
//                 objectFit="cover"
//                 zOrder={1}
//               />
//             )}
//           </TouchableOpacity>
//         </View>
//       )}

//       <View
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 50,
//           left: 50,
//           marginBottom: 16,
//           flexDirection: 'row',
//           justifyContent: callType === 'videoCall' ? 'space-around' : 'center',
//           zIndex: 10,
//         }}
//       >
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={{
//             backgroundColor: isMuted ? BaseColors.secondary : BaseColors.white,
//             padding: 12,
//             borderRadius: 100,
//             marginRight: callType === 'videoCall' ? 0 : 15,
//             borderWidth: 1,
//             borderColor: BaseColors.black30,
//           }}
//           onPress={() => {
//             toggleMute();
//           }}
//         >
//           <Icon
//             name={isMuted ? 'mic-off' : 'mic'}
//             size={20}
//             style={{ color: isMuted ? BaseColors.white : BaseColors.black }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             backgroundColor: BaseColors.red,
//             padding: 12,
//             borderRadius: 100,
//             // transform: [{rotate: '0deg'}],
//           }}
//           onPress={() => {
//             onBackPress();
//           }}
//         >
//           <Icon2
//             name={'call-end'}
//             size={20}
//             style={{ color: BaseColors.white }}
//           />
//         </TouchableOpacity>

//         {callType === 'videoCall' ? (
//           <TouchableOpacity
//             style={{
//               backgroundColor: videoMuted
//                 ? BaseColors.secondary
//                 : BaseColors.white,
//               padding: 12,
//               borderRadius: 100,
//               borderWidth: 1,
//               borderColor: BaseColors.black30,
//             }}
//             onPress={() => {
//               toggleVideo();
//             }}
//           >
//             <Icon
//               name={videoMuted ? 'video-off' : 'video'}
//               size={20}
//               style={{
//                 color: videoMuted ? BaseColors.white : BaseColors.black,
//               }}
//             />
//           </TouchableOpacity>
//         ) : null}
//         {!videoMuted ? (
//           <TouchableOpacity
//             style={{
//               backgroundColor: BaseColors.white,
//               padding: 12,
//               borderRadius: 100,
//               borderWidth: 1,
//               borderColor: BaseColors.black30,
//             }}
//             onPress={() => {
//               switchCamera();
//             }}
//           >
//             <Icon
//               name={'rotate-ccw'}
//               size={20}
//               style={{ color: BaseColors.black }}
//             />
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     </>
//   );
// });
// export default CallScreen;

// const styles = StyleSheet.create({
//   heading: {
//     alignSelf: 'center',
//     fontSize: 30,
//   },

//   rtcview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 15,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   rtcviewR: {
//     position: 'absolute',
//     height: '25%',
//     width: '30%',
//     top: 0,
//     start: 10,
//     margin: 16,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   rtc: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   rtcR: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   toggleButtons: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   callButtons: {
//     padding: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttonContainer: {
//     margin: 5,
//   },
// });
import { View, Text } from 'react-native'
import React from 'react'

const callScreen = () => {
  return (
    <View>
      <Text>callScreen</Text>
    </View>
  )
}

export default callScreen