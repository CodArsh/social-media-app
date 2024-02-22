import React, { Component } from 'react';
import { Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

class AudioSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      isPlaying: false,
      duration: 0,
      audioFileName: null,
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  componentDidMount() {
    console.log(this.props);
    this.requestAudioPermission();
    this.audioRecorderPlayer.addRecordBackListener(this.addRecordBackListener);
    this.audioRecorderPlayer.addPlayBackListener(this.addPlayBackListener);
  }

  componentWillUnmount() {
    this.audioRecorderPlayer.removeRecordBackListener();
    this.audioRecorderPlayer.removePlayBackListener();
    this.setState({ isPlaying: false });
  }

  requestAudioPermission = async () => {
    try {
      const audioPermission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.RECORD_AUDIO
          : PERMISSIONS.IOS.MICROPHONE;

      const result = await request(audioPermission);

      if (result === RESULTS.GRANTED) {
        console.log('Audio permission granted');
      } else {
        console.log('Audio permission denied');
      }
    } catch (error) {
      console.warn('Error requesting audio permission:', error);
    }
  };

  generateFileName = async () => {
    try {
      const timestamp = new Date().getTime();
      const directoryPath =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath // Use the app's document directory on iOS
          : RNFS.CachesDirectoryPath; // Use the app's cache directory on Android

      await RNFS.mkdir(directoryPath); // Ensure the directory exists

      const fileExtension = Platform.OS === 'ios' ? 'm4a' : 'mp3';

      const fileName = `sound_${timestamp}.${fileExtension}`;
      const filePath = `${directoryPath}/${fileName}`;

      console.log('Generated File Path:', filePath);

      return filePath;
    } catch (error) {
      console.error('Error generating file path:', error);
      throw error;
    }
  };

  startRecord = async () => {
    const audioFileName = await this.generateFileName();

    try {
      await this.audioRecorderPlayer.startRecorder(audioFileName);
      this.setState({ isRecording: true, audioFileName });
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  stopRecord = async () => {
    try {
      const recording = await this.audioRecorderPlayer.stopRecorder();
      this.setState({ isRecording: false });
      return recording;
      // Now you can use this.state.audioFileName to send to the database
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  startPlay = async e => {
    try {
      let path = e;
      path = String(e).replace('mp3', 'm4a');
      const result = await this.audioRecorderPlayer.startPlayer(path);
      console.log(result);

      this.setState({ isPlaying: true });
      return result;
    } catch (error) {
      console.error('Error starting playback:', error);
    }
  };

  addPlayBackListener = e => {
    console.log('Playback Event:', e);

    if (e.currentPosition >= e.duration) {
      // Playback is complete, stop playing
      console.log('Playback completed');
      this.stopPlay();
      this.props.onPlaybackComplete('finished_audio');
    }
  };

  stopPlay = async () => {
    try {
      await this.audioRecorderPlayer.stopPlayer();
      this.setState({ isPlaying: false });
    } catch (error) {
      console.error('Error stopping playback:', error);
    }
  };

  addRecordBackListener = e => {
    this.setState({ duration: e.currentPosition });
  };

  render() {
    return null;
  }
}

export default AudioSetup;
