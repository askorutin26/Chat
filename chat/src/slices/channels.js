import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  displayedChannelId:'',
});
const channelsSlice = createSlice({
  name: 'channels',
  initialState,

  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    renameChannel: channelsAdapter.updateOne,
    setActiveChannel: (state, { payload }) => {
     state.displayedChannelId = payload;
    },
  },
});

export const {
  addChannels, addChannel, removeChannel, renameChannel,setActiveChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

export default channelsSlice.reducer;
