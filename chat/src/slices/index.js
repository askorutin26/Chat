import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';
import currentChannelReducer from './currentChannel.js';
import modalsReducer from './modals.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer,
    modals: modalsReducer,
  },
});
