import { io } from 'socket.io-client';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const socketMiddleware = () => params => next => action => {
  const { getState } = params;
  const { type } = action;
  const url = BaseSetting.api.replace('/v1', '');
  const socket = io(url, {
    cors: {
      origin: '*',
    },
    autoConnect: false,
  });
  const tenant_id = getState().auth.userData?.tenant_id;
  const id = getState().auth.userData?.id;
  switch (type) {
    case 'socket/notification':
      if (!socket.connected) {
        socket.connect();
        socket.emit('joinRoom', { tenant_id, id });
      }
      socket.on('notification', data => {
        Toast.show({
          text1: data.msg,
          type: 'success',
        });
      });
      break;

    case 'socket/connect':
      socket.connect();
      socket.emit('joinRoom', { tenant_id, id });
      break;
    case 'socket/disconnect':
      socket.disconnect();
      break;

    default:
      break;
  }

  return next(action);
};
