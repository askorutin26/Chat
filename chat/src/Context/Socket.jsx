import { createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChannel,
  removeChannel,
  renameChannel
} from '../slices/channels.js';
import { addMessage } from '../slices/messages.js';
import store from '../slices/index.js';

const SocketContext = createContext({});
const notify = (message) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
function SocketProvider({ socket, children }) {
  const { t } = useTranslation();
  useEffect(() => {
    socket.on('newMessage', (message) => {
      const { id, channelId, username, ...rest } = message;
      const body = Object.values(rest).join('');
      const normalizedMessage = {
        body,
        channelId,
        id,
        username
      };
      store.dispatch(addMessage(normalizedMessage));
    });

    socket.on('newChannel', (channel) => {
      const { removable, id, ...rest } = channel;
      const name = Object.values(rest).join('');
      const normalizedChannel = {
        name,
        id,
        removable
      };
      store.dispatch(addChannel(normalizedChannel));
      notify(t('channelCreated'));
    });

    socket.on('removeChannel', (data) => {
      store.dispatch(removeChannel(data.id));
      notify(t('channelRemoved'));
    });

    socket.on('renameChannel', (data) => {
      const { id, removable, name } = data;
      store.dispatch(renameChannel({ id, changes: { removable, name } }));
      notify(t('channelRenamed'));
    });
  }, [socket, t]);

  const socketHandlers = {
    addNewMessage: (message) => socket.emit('newMessage', message),
    addNewChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (channel) => socket.emit('removeChannel', channel),
    renameChannel: (channel) => socket.emit('renameChannel', channel)
  };

  return (
    <SocketContext.Provider value={socketHandlers}>
      {children}
    </SocketContext.Provider>
  );
}
export { SocketContext };
export { SocketProvider };
