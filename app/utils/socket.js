import BaseSetting from '@config/setting';
import { io } from 'socket.io-client';

const localApiUrl = BaseSetting.socketServer;

const socket = io(localApiUrl, {
  autoConnect: false,
});

export default socket;
