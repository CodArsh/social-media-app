/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

const App = require('./app/Entrypoint').default;
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!...', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
